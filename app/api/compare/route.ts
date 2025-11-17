import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { userText, skills, area } = await request.json()

    if (!userText || !skills || !area) {
      return NextResponse.json(
        { error: 'Dados incompletos' },
        { status: 400 }
      )
    }

    // Tenta usar Perplexity AI
    const perplexityKey = process.env.PERPLEXITY_API_KEY
    
    if (perplexityKey) {
      try {
        const aiResult = await compareWithAI(userText, skills, area, perplexityKey)
        return NextResponse.json(aiResult)
      } catch (error) {
        console.error('Erro ao usar IA, fazendo comparação simples:', error)
        // Se falhar, usa comparação simples
      }
    }

    // Comparação simples por palavras-chave
    const simpleResult = compareSimple(userText, skills)
    return NextResponse.json(simpleResult)

  } catch (error) {
    console.error('Erro na comparação:', error)
    return NextResponse.json(
      { error: 'Erro ao processar comparação' },
      { status: 500 }
    )
  }
}

async function compareWithAI(
  userText: string,
  skills: string[],
  area: string,
  apiKey: string
) {
  const prompt = `Você é um analisador de currículos especializado. Analise o texto abaixo e identifique quais das competências listadas o candidato possui, baseando-se em menções diretas ou indiretas (experiências, projetos, tecnologias usadas).

Área: ${area}

Competências da área:
${skills.map((s, i) => `${i + 1}. ${s}`).join('\n')}

Texto do candidato:
${userText}

Responda APENAS no formato JSON:
{
  "matchedSkills": ["competência1", "competência2"],
  "missingSkills": ["competência3", "competência4"],
  "analysis": "breve análise do perfil"
}`

  const response = await fetch('https://api.perplexity.ai/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'llama-3.1-sonar-small-128k-online',
      messages: [
        {
          role: 'system',
          content: 'Você é um analisador de currículos. Sempre responda em JSON válido.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.2,
      max_tokens: 1000,
    }),
  })

  if (!response.ok) {
    throw new Error(`API Perplexity falhou: ${response.status}`)
  }

  const data = await response.json()
  const content = data.choices[0]?.message?.content || '{}'
  
  // Tenta extrair JSON da resposta
  const jsonMatch = content.match(/\{[\s\S]*\}/)
  if (jsonMatch) {
    const result = JSON.parse(jsonMatch[0])
    return {
      matches: result.matchedSkills.length,
      total: skills.length,
      matchedSkills: result.matchedSkills,
      missingSkills: result.missingSkills,
      analysis: result.analysis,
      method: 'ai'
    }
  }

  throw new Error('Resposta da IA inválida')
}

function compareSimple(userText: string, skills: string[]) {
  const textLower = userText.toLowerCase()
  const matchedSkills: string[] = []
  const missingSkills: string[] = []

  skills.forEach(skill => {
    const skillLower = skill.toLowerCase()
    // Busca por palavra completa ou partes da competência
    const words = skillLower.split(/[\s\-\/]+/)
    const hasMatch = words.some(word => 
      word.length > 2 && textLower.includes(word)
    )

    if (hasMatch) {
      matchedSkills.push(skill)
    } else {
      missingSkills.push(skill)
    }
  })

  return {
    matches: matchedSkills.length,
    total: skills.length,
    matchedSkills,
    missingSkills,
    analysis: `Comparação baseada em palavras-chave. ${matchedSkills.length} de ${skills.length} competências encontradas.`,
    method: 'simple'
  }
}

