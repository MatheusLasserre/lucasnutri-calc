import React, { useEffect, useState } from 'react'
import { StateButton } from '~/components/utils/Buttons'
import { CommonText } from '~/components/utils/Headers'
import {
  CLabel,
  CLCurrencyInput2,
  CLCurrencyInput2Desc,
  CLCurrencyInput3,
  CLRadio,
  FormError,
} from '~/components/utils/Inputs'
import { FlexColumn, FlexRow } from '~/components/utils/Utils'
import { CalcPesoEstimado, type CalcPesoEstimadoResult } from '~/utils/calcs'
import { buildQueryString } from '~/utils/formating/credentials'
import { getEtniaByNumber, getSexByNumber } from '~/utils/getters'

export type PesoEstimadoInputProps = {
  idade: number
  sexo: number
  etnia: number
  joelho: number
  braço: number
  panturrilha: number
  abdomen?: number
  subescapular?: number
  semiEnvergadura?: number
}

export const PesoEstimado: React.FC = () => {
  const [formInfo, setFormInfo] = useState<PesoEstimadoInputProps>({
    sexo: 1,
    etnia: 1,
    idade: 0,
    joelho: 0,
    braço: 0,
    panturrilha: 0,
    abdomen: undefined,
    subescapular: undefined,
    semiEnvergadura: undefined,
  })
  const [formError, setFormError] = useState<string | null>(null)
  const handleSubmit = () => {
    setFormError(null)
    if (formInfo.idade === 0) {
      setFormError('Idade precisa ser informada')
      return
    }
    if (formInfo.braço === 0) {
      setFormError('Circunferência do braço precisa ser informada')
      return
    }
    if (formInfo.panturrilha === 0) {
      setFormError('Circunferência do panturrilha precisa ser informada')
      return
    }
    let truthyObject = {} as { [key: string]: number }
    for (const value of Object.keys(formInfo)) {
      if (formInfo[value as keyof PesoEstimadoInputProps] !== undefined) {
        truthyObject[value] = formInfo[value as keyof PesoEstimadoInputProps]!
      }
    }
    const protocol = window.location.protocol
    const host = window.location.host
    const path = window.location.pathname
    const queryString = buildQueryString(truthyObject)
    window.location.assign(`${protocol}//${host}${path}results?${queryString}`)
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
        Cálculo de Peso e Altura Estimado
      </CommonText>
      <CommonText fontSize='14px' fontWeight='500' color='white-90' marginTop='0' textAlign='left'>
        Preencha os campos abaixo e veja o resultado. Os campos opcionais aumentam a precisão do cálculo.
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

        <CLabel label='Etnia*'>
          <FlexRow maxWidth='200px'>
            <CLRadio
              selected={formInfo.etnia === 1}
              setSelected={() => setFormInfo({ ...formInfo, etnia: 1 })}
              label={getEtniaByNumber(1)}
            />
            <CLRadio
              selected={formInfo.etnia === 2}
              setSelected={() => setFormInfo({ ...formInfo, etnia: 2 })}
              label={getEtniaByNumber(2)}
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
          currencyValue={formInfo.joelho || 0}
          setCurrencyValue={(value) => setFormInfo({ ...formInfo, joelho: value })}
          label='Altura joelho (cm)*'
          maxLength={2}
        />

        <CLCurrencyInput2
          currencyValue={formInfo.braço || 0}
          setCurrencyValue={(value) => setFormInfo({ ...formInfo, braço: value })}
          label='Circunferência do braço (cm)*'
          maxLength={2}
        />

        <CLCurrencyInput2
          currencyValue={formInfo.panturrilha || 0}
          setCurrencyValue={(value) => setFormInfo({ ...formInfo, panturrilha: value })}
          label='Circunferência da panturrilha (cm)*'
          maxLength={2}
        />

        <CLCurrencyInput2Desc
          currencyValue={formInfo.abdomen || 0}
          setCurrencyValue={(value) => setFormInfo({ ...formInfo, abdomen: value })}
          label='Circunferência do abdômen (cm)'
          maxLength={3}
          description='Mais recomendado'
        />

        <CLCurrencyInput2
          currencyValue={formInfo.subescapular || 0}
          setCurrencyValue={(value) => setFormInfo({ ...formInfo, subescapular: value })}
          label='Espessura de dobra cutanea subescapular(cm)'
          maxLength={2}
        />

        <CLCurrencyInput2
          currencyValue={formInfo.semiEnvergadura || 0}
          setCurrencyValue={(value) => setFormInfo({ ...formInfo, semiEnvergadura: value })}
          label='Semi-envergadura (cm)'
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

export const PesoEstimadoResult: React.FC = () => {
  const [formInfo, setFormInfo] = useState<PesoEstimadoInputProps>({
    sexo: 1,
    etnia: 1,
    idade: 0,
    joelho: 0,
    braço: 0,
    panturrilha: 0,
    abdomen: undefined,
    subescapular: undefined,
    semiEnvergadura: undefined,
  })
  const [pesoEstimadoResult, setPesoEstimadoResult] = useState<CalcPesoEstimadoResult | null>(null)

  useEffect(() => {
    if (window.location.search) {
      const params = new URLSearchParams(window.location.search)
      let paramsObj = {} as { [key: string]: number }
      for (const value of params.keys()) {
        const paramValue = params.get(value) as keyof PesoEstimadoInputProps | null
        if (paramValue === null) {
          continue
        }
        paramsObj[value] = Number(paramValue)
      }
      setFormInfo(paramsObj as PesoEstimadoInputProps)
      setPesoEstimadoResult(CalcPesoEstimado(paramsObj as PesoEstimadoInputProps))
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
      {(!formInfo.abdomen || !formInfo.semiEnvergadura || !formInfo.subescapular) && <CommonText
        fontSize='16px'
        fontWeight='700'
        color='secondary-red-400'
        marginTop='0'
        marginBottom='20px'
        textAlign='center'
      >
        Para maior precisão, informe todos os dados.
      </CommonText>}

      {pesoEstimadoResult && <ResultCard pesoEstimadoResult={pesoEstimadoResult} />}
      {pesoEstimadoResult && <UsedInputs formInfo={formInfo} />}
    </FlexColumn>
  )
}
type ResultCardProps = {
  pesoEstimadoResult: CalcPesoEstimadoResult
}
const ResultCard: React.FC<ResultCardProps> = ({ pesoEstimadoResult }) => {
  return (
    <FlexColumn gap='20px' horizontalAlign='center' verticalAlign='flex-start'>
      <FlexColumn backgroundColor='neutral-600' padding='20px' maxWidth='400px' gap='20px' styles={{
        border: '1px solid var(--neutral-500)',
        borderRadius: '8px',
      }}>
        <CommonText
          fontSize='16px'
          fontWeight='500'
          color='white-90'
          marginTop='0'
          textAlign='center'
        >
          {pesoEstimadoResult.peso.calc}
        </CommonText>
        <CommonText
          fontSize='20px'
          fontWeight='700'
          color='white-90'
          marginTop='0'
          textAlign='center'
        >
          {pesoEstimadoResult.peso.value}kg
        </CommonText>
      </FlexColumn>

      <FlexColumn backgroundColor='neutral-600' padding='20px' maxWidth='400px' gap='20px' styles={{
        border: '1px solid var(--neutral-500)',
        borderRadius: '8px',
      }}>
        <CommonText
          fontSize='16px'
          fontWeight='500'
          color='white-90'
          marginTop='0'
          textAlign='center'
        >
          {pesoEstimadoResult.altura.calc}
        </CommonText>
        <CommonText
          fontSize='20px'
          fontWeight='700'
          color='white-90'
          marginTop='0'
          textAlign='center'
        >
          {pesoEstimadoResult.altura.value} cm
        </CommonText>
      </FlexColumn>

      <FlexColumn backgroundColor='neutral-600' padding='20px' maxWidth='400px' gap='20px' styles={{
        border: '1px solid var(--neutral-500)',
        borderRadius: '8px',
      }}>
        <CommonText
         fontSize='16px'
          fontWeight='500'
          color='white-90'
          marginTop='0'
          textAlign='center'
        >
          Seu IMC estimado: {pesoEstimadoResult.IMC.imc}
        </CommonText>
        <CommonText
         fontSize='20px'
          fontWeight='700'
          color='white-90'
          marginTop='0'
          textAlign='center'
        >
         {pesoEstimadoResult.IMC.result}
        </CommonText>
      </FlexColumn>
    </FlexColumn>
  )
}

const UsedInputs: React.FC<{
  formInfo: PesoEstimadoInputProps
}> = ({ formInfo }) => {
  return (
    <FlexColumn backgroundColor='neutral-600' horizontalAlign='flex-start' padding='20px' maxWidth='400px' gap='20px' styles={{
      border: '1px solid var(--neutral-500)',
      borderRadius: '8px',
    }}>
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
         <span style={{
          fontWeight: '700',
         }}> Sexo:</span> {getSexByNumber(formInfo.sexo as 1 | 2)}
        </CommonText>
        <CommonText
          fontSize='16px'
          fontWeight='500'
          color='white-90'
          marginTop='0'
          textAlign='left'
        >
          <span style={{
          fontWeight: '700',
         }}>Etnia:</span> {getEtniaByNumber(formInfo.etnia as 1 | 2)}
        </CommonText>
        <CommonText
          fontSize='16px'
          fontWeight='500'
          color='white-90'
          marginTop='0'
          textAlign='left'
        >
          <span style={{
          fontWeight: '700',
         }}>Idade:</span> {formInfo.idade} anos
        </CommonText>
      </FlexColumn>

      <FlexColumn>
        <CommonText
          fontSize='16px'
          fontWeight='500'
          color='white-90'
          marginTop='0'
          textAlign='left'
        >
          <span style={{
          fontWeight: '700',
         }}>Circunferência do braço:</span> {formInfo.braço} cm
        </CommonText>
        <CommonText
          fontSize='16px'
          fontWeight='500'
          color='white-90'
          marginTop='0'
          textAlign='left'
        >
          <span style={{
          fontWeight: '700',
         }}>Circunferência do panturrilha:</span> {formInfo.panturrilha} cm
        </CommonText>
        <CommonText
          fontSize='16px'
          fontWeight='500'
          color='white-90'
          marginTop='0'
          textAlign='left'
        >
          <span style={{
          fontWeight: '700',
         }}>Circunferência de Abdômen:</span> {formInfo.abdomen} cm
        </CommonText>
      </FlexColumn>

      <FlexColumn>
        <CommonText
          fontSize='16px'
          fontWeight='500'
          color='white-90'
          marginTop='0'
          textAlign='left'
        >
          <span style={{
          fontWeight: '700',
         }}>Espessura de dobra cutanea subescapular:</span>{' '}
          {formInfo.subescapular ? formInfo.subescapular + ' cm' : 'Não informado'}
        </CommonText>
        <CommonText
          fontSize='16px'
          fontWeight='500'
          color='white-90'
          marginTop='0'
          textAlign='left'
        >
          <span style={{
          fontWeight: '700',
         }}>Semi-envergadura:</span>{' '}
          {formInfo.semiEnvergadura ? formInfo.semiEnvergadura + ' cm' : 'Não informado'}
        </CommonText>
      </FlexColumn>
    </FlexColumn>
  )
}
