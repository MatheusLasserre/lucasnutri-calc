import React, { useEffect, useState } from 'react'
import { StateButton } from '~/components/utils/Buttons'
import { CommonText } from '~/components/utils/Headers'
import {
  CLCurrencyInput2,
  CLCurrencyInput2kg,
  CLCurrencyInput3,
  FormError,
} from '~/components/utils/Inputs'
import { FlexColumn } from '~/components/utils/Utils'
import {
  CalcPesoIdeal,
  type CalcPesoIdealResult,
} from '~/utils/calcs'
import { buildQueryString } from '~/utils/formating/credentials'

export type PesoIdealInputProps = {
  idade: number
  altura: number
  peso: number
}

export const PesoIdeal: React.FC = () => {
  const [formInfo, setFormInfo] = useState<PesoIdealInputProps>({
    idade: 0,
    altura: 0,
    peso: 0,
  })
  const [formError, setFormError] = useState<string | null>(null)
  const handleSubmit = () => {
    setFormError(null)
    if (formInfo.idade === 0) {
      setFormError('Idade precisa ser informada')
      return
    }
    if (formInfo.altura === 0) {
      setFormError('Circunferência do braço precisa ser informada')
      return
    }
    if (formInfo.peso === 0) {
      setFormError('Circunferência do panturrilha precisa ser informada')
      return
    }
    let truthyObject = {} as { [key: string]: number }
    for (const value of Object.keys(formInfo)) {
      if (formInfo[value as keyof PesoIdealInputProps] !== undefined) {
        truthyObject[value] = formInfo[value as keyof PesoIdealInputProps]!
      }
    }
    const protocol = window.location.protocol
    const host = window.location.host
    const path = window.location.pathname
    const queryString = buildQueryString(truthyObject)
    window.location.assign(`${protocol}//${host}${path}/results?${queryString}`)
  }
  return (
    <FlexColumn
      verticalAlign='flex-start'
      horizontalAlign='center'
      gap='20px'
      margin='20px auto 0 auto'
      width='100%'
      maxWidth='400px'
      padding='80px 0 20px 0'
      backgroundColor='neutral-600'
      styles={{
        border: '1px solid var(--neutral-600)',
        borderRadius: '8px',
        padding: '30px 20px 30px 20px',
      }}
    >
      <CommonText
        fontSize='20px'
        fontWeight='700'
        color='white-90'
        marginTop='0'
        textAlign='center'
        lineHeight='22px'
      >
        Cálculo de Peso Ideal
      </CommonText>
      <CommonText fontSize='14px' fontWeight='500' color='white-90' marginTop='0' textAlign='left'>
        Preencha os campos abaixo e veja o resultado.
      </CommonText>
      <FlexColumn verticalAlign='flex-start' horizontalAlign='center' gap='20px' margin='auto'>
        <CLCurrencyInput3
          currencyValue={formInfo.idade || 0}
          setCurrencyValue={(value) => setFormInfo({ ...formInfo, idade: value })}
          label='Idade*'
          maxLength={2}
        />

        <CLCurrencyInput2
          currencyValue={formInfo.altura || 0}
          setCurrencyValue={(value) => setFormInfo({ ...formInfo, altura: value })}
          label='Altura (cm)*'
          maxLength={3}
        />

        <CLCurrencyInput2kg
          currencyValue={formInfo.peso || 0}
          setCurrencyValue={(value) => setFormInfo({ ...formInfo, peso: value })}
          label='Peso(kg)*'
          maxLength={2}
        />

        <StateButton onClick={handleSubmit} type='compact' loading={false}>
          Calcular
        </StateButton>
        <FormError message={formError} isError={!!formError} />
      </FlexColumn>
    </FlexColumn>
  )
}

export const PesoIdealResult: React.FC = () => {
  const [formInfo, setFormInfo] = useState<PesoIdealInputProps>({
    idade: 0,
    altura: 0,
    peso: 0,
  })
  const [pesoEstimadoResult, setPesoEstimadoResult] = useState<CalcPesoIdealResult | null>(null)
console.log(pesoEstimadoResult)
  useEffect(() => {
    if (window.location.search) {
      const params = new URLSearchParams(window.location.search)
      let paramsObj = {} as { [key: string]: number }
      for (const value of params.keys()) {
        const paramValue = params.get(value) as keyof PesoIdealInputProps | null
        if (paramValue === null) {
          continue
        }
        paramsObj[value] = Number(paramValue)
      }
      setFormInfo(paramsObj as PesoIdealInputProps)
      setPesoEstimadoResult(CalcPesoIdeal(paramsObj as PesoIdealInputProps))
    }
  }, [])
  return (
    <FlexColumn padding='30px 10px 10px 10px' horizontalAlign='center' gap='20px'>
      <CommonText
        fontSize='24px'
        fontWeight='700'
        color='white-90'
        marginTop='0'
        marginBottom='0px'
        textAlign='center'
      >
        Resultados
      </CommonText>
      {pesoEstimadoResult && <ResultCard pesoIdealResult={pesoEstimadoResult} />}
      {pesoEstimadoResult && <UsedInputs formInfo={formInfo} />}
    </FlexColumn>
  )
}
type ResultCardProps = {
  pesoIdealResult: CalcPesoIdealResult
}
const ResultCard: React.FC<ResultCardProps> = ({ pesoIdealResult }) => {
  return (
    <FlexColumn gap='20px' horizontalAlign='center' verticalAlign='flex-start'>
      <FlexColumn
        backgroundColor='neutral-600'
        padding='20px'
        maxWidth='400px'
        gap='20px'
        styles={{
          border: '1px solid var(--neutral-500)',
          borderRadius: '8px',
        }}
      >
        <CommonText
          fontSize='16px'
          fontWeight='500'
          color='white-90'
          marginTop='0'
          textAlign='center'
        >
          Peso Ideal
        </CommonText>
        <CommonText
          fontSize='20px'
          fontWeight='700'
          color='white-90'
          marginTop='0'
          textAlign='center'
        >
          Seu peso ideal é entre{' '}
          <span
            style={{
              fontWeight: '700',
              color: 'var(--primary-400)',
            }}
          >
            {pesoIdealResult.pesoMinimo}kg
          </span>{' '}
          e{' '}
          <span
            style={{
              fontWeight: '700',
              color: 'var(--primary-400)',
            }}
          >
            {pesoIdealResult.pesoMaximo}kg
          </span>
        </CommonText>
      </FlexColumn>

      <FlexColumn
        backgroundColor='neutral-600'
        padding='20px'
        maxWidth='400px'
        gap='20px'
        styles={{
          border: '1px solid var(--neutral-500)',
          borderRadius: '8px',
        }}
      >
        <CommonText
          fontSize='16px'
          fontWeight='500'
          color='white-90'
          marginTop='0'
          textAlign='center'
        >
          Seu IMC atual: {pesoIdealResult.IMC.imc}
        </CommonText>
        <CommonText
          fontSize='20px'
          fontWeight='700'
          color='white-90'
          marginTop='0'
          textAlign='center'
        >
          {pesoIdealResult.IMC.result}
        </CommonText>
      </FlexColumn>
    </FlexColumn>
  )
}

const UsedInputs: React.FC<{
  formInfo: PesoIdealInputProps
}> = ({ formInfo }) => {
  return (
    <FlexColumn
      backgroundColor='neutral-600'
      horizontalAlign='flex-start'
      padding='20px'
      maxWidth='400px'
      gap='20px'
      styles={{
        border: '1px solid var(--neutral-500)',
        borderRadius: '8px',
      }}
    >
      <CommonText
        fontSize='20px'
        fontWeight='700'
        color='white-90'
        marginTop='0'
        textAlign='center'
      >
        Dados informados
      </CommonText>
      <FlexColumn>
        <CommonText
          fontSize='16px'
          fontWeight='500'
          color='white-90'
          marginTop='0'
          textAlign='left'
        >
          <span
            style={{
              fontWeight: '700',
            }}
          >
            Idade:
          </span>{' '}
          {formInfo.idade} anos
        </CommonText>
        <CommonText
          fontSize='16px'
          fontWeight='500'
          color='white-90'
          marginTop='0'
          textAlign='left'
        >
          <span
            style={{
              fontWeight: '700',
            }}
          >
            Altura:
          </span>{' '}
          {formInfo.altura} cm
        </CommonText>
        <CommonText
          fontSize='16px'
          fontWeight='500'
          color='white-90'
          marginTop='0'
          textAlign='left'
        >
          <span
            style={{
              fontWeight: '700',
            }}
          >
            Peso:
          </span>{' '}
          {formInfo.peso} kg
        </CommonText>
      </FlexColumn>
    </FlexColumn>
  )
}
