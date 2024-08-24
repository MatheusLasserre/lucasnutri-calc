import type { PesoEstimadoInputProps } from '~/components/forms/peso-estimado/Index'
import { getEtniaByNumber, getSexByNumber, isIdoso } from './getters'
import type { PesoIdealInputProps } from '~/components/forms/peso-ideal/Index'

const AlturaHomemChumlea = (joelho: number, idade: number, etnia: 1 | 2, sexo: 1 | 2) => {
  const Etnia = getEtniaByNumber(etnia)
  const Sexo = getSexByNumber(sexo)

  if (Etnia === 'Branco') {
    if (Sexo === 'Homem') {
      return 71.85 + 1.88 * joelho
    } else {
      return 70.25 + 1.87 * joelho - 0.06 * idade
    }
  } else {
    if (Sexo === 'Homem') {
      return 73.42 + 1.79 * joelho
    } else {
      return 68.1 + 1.86 * joelho - 0.06 * idade
    }
  }
}

const AlturaMulherRabito = (semiEnvergadura: number, idade: number, sexo: 1 | 2) => {
  const Sexo = getSexByNumber(sexo)

  return 63.525 - 3.237 * (Sexo === 'Homem' ? 1 : 2) - 0.06904 * idade + 1.293 * semiEnvergadura
}

const PesoHomemRabito = (braço: number, panturrilha: number, abdomen: number) => {
  return 0.4808 * braço + 0.5646 * abdomen + 1.316 * panturrilha - 42.245
}

const PesoMulherChumlea = (
  abdomen: number,
  braço: number,
  panturrilha: number,
  sexo: 1 | 2,
  subescapular?: number,
  joelho?: number,
) => {
  if (subescapular && joelho) {
    return 0.87 * joelho + 0.98 * braço + 1.27 * panturrilha + 0.4 * subescapular - 62.35
  } else {
    const Sexo = getSexByNumber(sexo)
    return (
      0.5263 * abdomen +
      0.5759 * braço +
      1.2452 * panturrilha -
      4.8689 * (Sexo === 'Homem' ? 1 : 2) -
      32.9241
    )
  }
}

const PesoHomemPadrão = (braço: number, joelho: number, idade: number, etnia: 1 | 2) => {
  if (idade < 60) {
    if (getEtniaByNumber(etnia) === 'Negro') {
      return joelho * 1.09 + braço * 3.14 - 83.72
    } else {
      return joelho * 1.19 + braço * 3.21 - 86.82
    }
  } else {
    if (getEtniaByNumber(etnia) === 'Negro') {
      return joelho * 0.44 + braço * 2.86 - 38.21
    } else {
      return joelho * 1.1 + braço * 3.07 - 75.81
    }
  }
}

const PesoMulherPadrão = (braço: number, joelho: number, idade: number, etnia: 1 | 2) => {
  if (idade < 60) {
    if (getEtniaByNumber(etnia) === 'Negro') {
      return joelho * 1.24 + braço * 2.97 - 82.48
    } else {
      return joelho * 1.01 + braço * 2.81 - 60.04
    }
  } else {
    if (getEtniaByNumber(etnia) === 'Negro') {
      return joelho * 1.5 + braço * 2.58 - 84.22
    } else {
      return joelho * 1.09 + braço * 2.68 - 65.51
    }
  }
}

export type CalcPesoEstimadoResult = {
  peso: {
    value: number
    calc: string
  }
  altura: {
    value: number
    calc: string
  }
  IMC: {
    imc: string
    result: string
  }
}
export const CalcPesoEstimado = (input: PesoEstimadoInputProps): CalcPesoEstimadoResult => {
  const Sexo = getSexByNumber(input.sexo as 1 | 2)
  if (Sexo === 'Homem') {
    let peso = {
      value: 0,
      calc: '',
    }
    if (input.abdomen) {
      peso = {
        value:
          Math.round(PesoHomemRabito(input.braço, input.panturrilha, input.abdomen) * 100) / 100,
        calc: 'Peso Estimado (Rabito et al)',
      }
    } else {
      peso = {
        value:
          Math.round(
            PesoHomemPadrão(input.braço, input.joelho, input.idade, input.etnia as 1 | 2) * 100,
          ) / 100,
        calc: 'Peso Estimado (Básico)',
      }
    }
    const altura = {
      value:
        Math.round(
          AlturaHomemChumlea(input.joelho, input.idade, input.etnia as 1 | 2, input.sexo as 1 | 2) *
            100,
        ) / 100,
      calc: 'Altura Estimada (Chumlea et al)',
    }
    const IMC = CalcIMC(peso.value, altura.value, input.idade)
    return {
      peso,
      altura,
      IMC,
    }
  } else {
    let peso = { value: 0, calc: '' }
    if (input.abdomen) {
      peso = {
        value:
          Math.round(
            PesoMulherChumlea(
              input.abdomen,
              input.braço,
              input.panturrilha,
              input.sexo as 1 | 2,
              input.subescapular,
              input.joelho,
            ) * 100,
          ) / 100,
        calc: 'Peso Estimado (Chumlea et al)',
      }
    } else {
      peso = {
        value:
          Math.round(
            PesoMulherPadrão(input.braço, input.joelho, input.idade, input.etnia as 1 | 2) * 100,
          ) / 100,
        calc: 'Peso Estimado (Básico)',
      }
    }
    let altura = {
      value: 0,
      calc: '',
    }
    if (input.semiEnvergadura) {
      altura = {
        value:
          Math.round(
            AlturaMulherRabito(input.semiEnvergadura, input.idade, input.sexo as 1 | 2) * 100,
          ) / 100,
        calc: 'Altura Estimada (Rabito et al)',
      }
    } else {
      altura = {
        value:
          Math.round(
            AlturaHomemChumlea(
              input.joelho,
              input.idade,
              input.etnia as 1 | 2,
              input.sexo as 1 | 2,
            ) * 100,
          ) / 100,
        calc: 'Altura Estimada (Chumlea et al)',
      }
    }
    const IMC = CalcIMC(peso.value, altura.value, input.idade)
    return {
      peso,
      altura,
      IMC,
    }
  }
}

const AdequacaoObject = [
  {
    minValue: 0,
    maxValue: 70,
    result: 'Desnutrição Grave',
  },
  {
    minValue: 70,
    maxValue: 80,
    result: 'Desnutrição Moderada',
  },
  {
    minValue: 80,
    maxValue: 90,
    result: 'Desnutrição Moderada',
  },
  {
    minValue: 90,
    maxValue: 110,
    result: 'Eutrofia',
  },
  {
    minValue: 110,
    maxValue: 120,
    result: 'sobrepeso',
  },
  {
    minValue: 120,
    maxValue: Infinity,
    result: 'obesidade',
  },
]
export type CalcAdequacaoBraquialResult = {
  CB: number
  result: string
}
export const CalcAdequacaoBraquial = (CB: number, idade: number, sexo: 1 | 2): CalcAdequacaoBraquialResult => {
  const value = (CB * 100) / ((CB * 100) / getP50(sexo, idade))
  const result = AdequacaoObject.find((element) => {
    const result = element.minValue <= value && value <= element.maxValue
    return result
  })?.result
  if (!result) throw new Error('CB não encontrado')
  return {
    CB,
    result,
  }
}
const P50Homem = [
  {
    minValue: 1,
    maxValue: 1.9,
    result: 16,
  },
  {
    minValue: 2,
    maxValue: 2.9,
    result: 17.1,
  },
  {
    minValue: 3,
    maxValue: 3.9,
    result: 16.8,
  },
  {
    minValue: 4,
    maxValue: 4.9,
    result: 17.1,
  },
  {
    minValue: 5,
    maxValue: 5.9,
    result: 17.5,
  },
  {
    minValue: 6,
    maxValue: 6.9,
    result: 18,
  },
  {
    minValue: 7,
    maxValue: 7.9,
    result: 18.7,
  },
  {
    minValue: 8,
    maxValue: 8.9,
    result: 19.2,
  },
  {
    minValue: 9,
    maxValue: 9.9,
    result: 20.1,
  },
  {
    minValue: 10,
    maxValue: 10.9,
    result: 21.1,
  },
  {
    minValue: 11,
    maxValue: 11.9,
    result: 22.1,
  },
  {
    minValue: 12,
    maxValue: 12.9,
    result: 23.1,
  },
  {
    minValue: 13,
    maxValue: 13.9,
    result: 24.5,
  },
  {
    minValue: 14,
    maxValue: 14.9,
    result: 25.7,
  },
  {
    minValue: 15,
    maxValue: 15.9,
    result: 27.2,
  },
  {
    minValue: 16,
    maxValue: 16.9,
    result: 28.3,
  },
  {
    minValue: 17,
    maxValue: 17.9,
    result: 28.6,
  },
  {
    minValue: 18,
    maxValue: 24.9,
    result: 30.7,
  },
  {
    minValue: 25,
    maxValue: 29.9,
    result: 31.8,
  },
  {
    minValue: 30,
    maxValue: 34.9,
    result: 32.5,
  },
  {
    minValue: 35,
    maxValue: 39.9,
    result: 32.9,
  },
  {
    minValue: 40,
    maxValue: 44.9,
    result: 32.8,
  },
  {
    minValue: 45,
    maxValue: 49.9,
    result: 32.6,
  },
  {
    minValue: 50,
    maxValue: 54.9,
    result: 32.3,
  },
  {
    minValue: 55,
    maxValue: 59.9,
    result: 32.3,
  },
  {
    minValue: 60,
    maxValue: 64.9,
    result: 32,
  },
  {
    minValue: 65,
    maxValue: 69.9,
    result: 31.1,
  },
  {
    minValue: 70,
    maxValue: 74.9,
    result: 30.7,
  },
]
const P50Mulher = [
  {
    minValue: 1,
    maxValue: 1.9,
    result: 15.7,
  },
  {
    minValue: 2,
    maxValue: 2.9,
    result: 16.1,
  },
  {
    minValue: 3,
    maxValue: 3.9,
    result: 16.6,
  },
  {
    minValue: 4,
    maxValue: 4.9,
    result: 17,
  },
  {
    minValue: 5,
    maxValue: 5.9,
    result: 17.5,
  },
  {
    minValue: 6,
    maxValue: 6.9,
    result: 17.8,
  },
  {
    minValue: 7,
    maxValue: 7.9,
    result: 18.6,
  },
  {
    minValue: 8,
    maxValue: 8.9,
    result: 19.5,
  },
  {
    minValue: 9,
    maxValue: 9.9,
    result: 20.6,
  },
  {
    minValue: 10,
    maxValue: 10.9,
    result: 21.2,
  },
  {
    minValue: 11,
    maxValue: 11.9,
    result: 22.2,
  },
  {
    minValue: 12,
    maxValue: 12.9,
    result: 23.7,
  },
  {
    minValue: 13,
    maxValue: 13.9,
    result: 24.3,
  },
  {
    minValue: 14,
    maxValue: 14.9,
    result: 25.1,
  },
  {
    minValue: 15,
    maxValue: 15.9,
    result: 25.2,
  },
  {
    minValue: 16,
    maxValue: 16.9,
    result: 26.1,
  },
  {
    minValue: 17,
    maxValue: 17.9,
    result: 26.6,
  },
  {
    minValue: 18,
    maxValue: 24.9,
    result: 26.8,
  },
  {
    minValue: 25,
    maxValue: 29.9,
    result: 27.6,
  },
  {
    minValue: 30,
    maxValue: 34.9,
    result: 28.6,
  },
  {
    minValue: 35,
    maxValue: 39.9,
    result: 29.4,
  },
  {
    minValue: 40,
    maxValue: 44.9,
    result: 29.7,
  },
  {
    minValue: 45,
    maxValue: 49.9,
    result: 30.1,
  },
  {
    minValue: 50,
    maxValue: 54.9,
    result: 30.6,
  },
  {
    minValue: 55,
    maxValue: 59.9,
    result: 30.9,
  },
  {
    minValue: 60,
    maxValue: 64.9,
    result: 30.8,
  },
  {
    minValue: 65,
    maxValue: 69.9,
    result: 30.5,
  },
  {
    minValue: 70,
    maxValue: 74.9,
    result: 30.3,
  },
]
const getP50 = (sexo: 1 | 2, idade: number) => {
  if (idade < 1 || idade >= 75) throw new Error('idade inválida')
  const Sexo = getSexByNumber(sexo)
  if (Sexo === 'Homem') {
    const result = P50Homem.find((element) => {
      const result = element.minValue <= idade && idade <= element.maxValue
      return result
    })?.result
    if (!result) throw new Error('idade inválida')
    return result
  } else {
    const result = P50Mulher.find((element) => {
      const result = element.minValue <= idade && idade <= element.maxValue
      return result
    })?.result
    if (!result) throw new Error('idade inválida')
    return result
  }
}

const IMCJObject = [
  {
    minValue: 0,
    maxValue: 16.9,
    result: 'muito abaixo do peso',
  },
  {
    minValue: 17,
    maxValue: 18.4,
    result: 'abaixo do peso',
  },
  {
    minValue: 18.5,
    maxValue: 24.9,
    result: 'peso normal',
  },
  {
    minValue: 25,
    maxValue: 29.9,
    result: 'acima do peso',
  },
  {
    minValue: 30,
    maxValue: 34.9,
    result: 'obesidade grau 1',
  },
  {
    minValue: 35,
    maxValue: 40,
    result: 'obesidade grau 2',
  },
  {
    minValue: 40,
    maxValue: Infinity,
    result: 'obesidade grau 3',
  },
]
const IMCJObjectElder = [
  {
    minValue: 0,
    maxValue: 22,
    result: 'Desnutrição',
  },
  {
    minValue: 22,
    maxValue: 27,
    result: 'Eutrofia',
  },
  {
    minValue: 27,
    maxValue: Infinity,
    result: 'obesidade',
  },
]

const CalcIMC = (peso: number, altura: number, idade: number) => {
  console.log(peso, altura, idade)
  const IMC = peso / Math.pow(altura / 100, 2)
  let IMCResult: string | undefined
  if (isIdoso(idade)) {
    IMCResult = IMCJObjectElder.find((element) => {
      return element.minValue <= IMC && IMC <= element.maxValue
    })?.result
  } else {
    IMCResult = IMCJObject.find((element) => {
      return element.minValue <= IMC && IMC <= element.maxValue
    })?.result
  }
  if (!IMCResult) throw new Error('IMC não encontrado')

  return {
    imc: IMC.toFixed(1),
    result: IMCResult,
  }
}

const CalcPesoByIMC = (altura: number, idade: number) => {
  if (isIdoso(idade)) {
    const Peso1 = 22 * Math.pow(altura / 100, 2)
    const Peso2 = 27 * Math.pow(altura / 100, 2)
    return {
      PesoMinimo: Peso1,
      PesoMaximo: Peso2,
    }
  }

  const Peso1 = 18.5 * Math.pow(altura / 100, 2)
  const Peso2 = 24.9 * Math.pow(altura / 100, 2)

  return {
    PesoMinimo: Peso1,
    PesoMaximo: Peso2,
  }
}

const PesoIdeal = (altura: number, idade: number) => {
  return CalcPesoByIMC(altura, idade)
}
export type CalcPesoIdealResult = {
  pesoMinimo: number
  pesoMaximo: number
  pesoAtual: number
  IMC: {
    imc: string
    result: string
  }
}
export const CalcPesoIdeal = (input: PesoIdealInputProps): CalcPesoIdealResult => {
  const pesoIdeal = PesoIdeal(input.altura, input.idade)
  const IMC = CalcIMC(input.peso, input.altura, input.idade)
  return {
    pesoMinimo: Math.round(pesoIdeal.PesoMinimo * 100) / 100,
    pesoMaximo: Math.round(pesoIdeal.PesoMaximo * 100) / 100,
    pesoAtual: Math.round(input.peso * 100) / 100,
    IMC,
  }
}
