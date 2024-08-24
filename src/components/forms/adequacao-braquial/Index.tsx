import React, { useEffect, useState } from 'react'
import { StateButton } from '~/components/utils/Buttons'
import { CommonText } from '~/components/utils/Headers'
import {
  CLabel,
  CLCurrencyInput,
  CLCurrencyInput2,
  CLCurrencyInput2Desc,
  CLCurrencyInput2kg,
  CLCurrencyInput3,
  CLRadio,
  CRadio,
  FormError,
  FormFlex,
} from '~/components/utils/Inputs'
import { FlexColumn, FlexRow } from '~/components/utils/Utils'
import {
  CalcAdequacaoBraquial,
  CalcPesoEstimado,
  CalcPesoIdeal,
  type CalcAdequacaoBraquialResult,
  type CalcPesoEstimadoResult,
  type CalcPesoIdealResult,
} from '~/utils/calcs'
import { buildQueryString } from '~/utils/formating/credentials'
import { getEtniaByNumber, getSexByNumber } from '~/utils/getters'

export type AdequacaoInputProps = {
  idade: number
  braco: number
  sexo: number
}

export const AdequacaoBraquial: React.FC = () => {
  const [formInfo, setFormInfo] = useState<AdequacaoInputProps>({
    idade: 0,
    braco: 0,
    sexo: 1,
  })
  const [formError, setFormError] = useState<string | null>(null)
  const handleSubmit = () => {
    setFormError(null)
    if (formInfo.idade === 0) {
      setFormError('Idade precisa ser informada')
      return
    }
    if (formInfo.braco === 0) {
      setFormError('Circunferência do braço precisa ser informada')
      return
    }

    let truthyObject = {} as { [key: string]: number }
    for (const value of Object.keys(formInfo)) {
      if (formInfo[value as keyof AdequacaoInputProps] !== undefined) {
        truthyObject[value] = formInfo[value as keyof AdequacaoInputProps]!
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
        Cálculo de Adequação de Circunferência Braquial
      </CommonText>
      <CommonText fontSize='14px' fontWeight='500' color='white-90' marginTop='0' textAlign='left'>
        Preencha os campos abaixo e veja o resultado.
      </CommonText>
      <FlexColumn verticalAlign='flex-start' horizontalAlign='center' gap='20px' margin='auto'>
        <CLabel label='Sexo*'>
          <FlexRow maxWidth='200px'>
            <CLRadio
              selected={formInfo.sexo === 1}
              setSelected={() => setFormInfo({ ...formInfo, sexo: 1 })}
              label={getSexByNumber(1)}
            />
            <CLRadio
              selected={formInfo.sexo === 2}
              setSelected={() => setFormInfo({ ...formInfo, sexo: 2 })}
              label={getSexByNumber(2)}
            />
          </FlexRow>
        </CLabel>

        <CLCurrencyInput3
          currencyValue={formInfo.idade || 0}
          setCurrencyValue={(value) => setFormInfo({ ...formInfo, idade: value })}
          label='Idade*'
          maxLength={2}
        />

        <CLCurrencyInput2
          currencyValue={formInfo.braco || 0}
          setCurrencyValue={(value) => setFormInfo({ ...formInfo, braco: value })}
          label='Circunferência do braço (cm)*'
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

export const AdequacaoBraquialResults: React.FC = () => {
  const [formInfo, setFormInfo] = useState<AdequacaoInputProps>({
    idade: 0,
    braco: 0,
    sexo: 1,
  })
  const [adequacaoResult, setAdequacaoResult] = useState<CalcAdequacaoBraquialResult | null>(null)
  console.log(adequacaoResult)
  useEffect(() => {
    if (window.location.search) {
      const params = new URLSearchParams(window.location.search)
      let paramsObj = {} as { [key: string]: number }
      for (const value of params.keys()) {
        const paramValue = params.get(value) as keyof AdequacaoInputProps | null
        if (paramValue === null) {
          continue
        }
        paramsObj[value] = Number(paramValue)
      }
      const typedParambs = paramsObj as AdequacaoInputProps
      setFormInfo(paramsObj as AdequacaoInputProps)
      setAdequacaoResult(CalcAdequacaoBraquial(typedParambs.braco, typedParambs.idade, typedParambs.sexo as 1 | 2))
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
      {adequacaoResult && <ResultCard adequacaoResult={adequacaoResult} />}
      {adequacaoResult && <UsedInputs formInfo={formInfo} />}
    </FlexColumn>
  )
}
type ResultCardProps = {
  adequacaoResult: CalcAdequacaoBraquialResult
}
const ResultCard: React.FC<ResultCardProps> = ({ adequacaoResult: pesoIdealResult }) => {
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
          Adequação de Circunferência Braquial: {pesoIdealResult.CB}%
        </CommonText>
        <CommonText
          fontSize='20px'
          fontWeight='700'
          color='white-90'
          marginTop='0'
          textAlign='center'
        >
          {pesoIdealResult.result}
        </CommonText>
      </FlexColumn>

    </FlexColumn>
  )
}

const UsedInputs: React.FC<{
  formInfo: AdequacaoInputProps
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
          {formInfo.braco} cm
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
          {formInfo.sexo} kg
        </CommonText>
      </FlexColumn>
    </FlexColumn>
  )
}
