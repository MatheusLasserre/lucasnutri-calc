import React, { useState } from 'react'
import { StateButton } from '~/components/utils/Buttons'
import { CommonText } from '~/components/utils/Headers'
import {
  CLabel,
  CLCurrencyInput,
  CLCurrencyInput2,
  CLRadio,
  CRadio,
  FormFlex,
} from '~/components/utils/Inputs'
import { FlexColumn, FlexRow } from '~/components/utils/Utils'
import { getEtniaByNumber, getSexByNumber } from '~/utils/getters'

export const PesoEstimado: React.FC = () => {
  type InputProps = {
    idade: number
    sexo: number
    etnia: number
    altura: number
    joelho?: number
    braço?: number
    panturrilha?: number
    abdômen?: number
    subescapular?: number
    semiEnvergadura?: number
  }
  const [formInfo, setFormInfo] = useState<InputProps>({
    sexo: 1,
    etnia: 1,
    idade: 0,
    altura: 0,
    joelho: undefined,
    braço: undefined,
    panturrilha: undefined,
    abdômen: undefined,
    subescapular: undefined,
    semiEnvergadura: undefined,
  })
  const [showResult, setShowResult] = useState(false)
  const handleSubmit = () => {}
  return (
    <FlexColumn
      verticalAlign='flex-start'
      horizontalAlign='center'
      gap='20px'
      margin='40px auto 0 auto'
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
      >
        Cálculo de Peso e Altura Estimado
      </CommonText>
      <CommonText fontSize='14px' fontWeight='500' color='white-90' marginTop='0' textAlign='left'>
        Preencha os dados abaixo e veja o resultado. Vários cálculos são utiliados, então quanto
        mais dados você enviar, mais resultados aparecerão.
      </CommonText>
      <FlexColumn verticalAlign='flex-start' horizontalAlign='center' gap='20px' margin='auto'>
        <CLabel label='Sexo'>
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

        <CLabel label='Etnia'>
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

        <CLCurrencyInput
          currencyValue={formInfo.altura}
          setCurrencyValue={(value) => setFormInfo({ ...formInfo, altura: value })}
          label='Altura (metros)'
          maxLength={4}
        />

        <CLCurrencyInput2
          currencyValue={formInfo.joelho || 0}
          setCurrencyValue={(value) => setFormInfo({ ...formInfo, joelho: value })}
          label='Altura joelho (cm)'
          maxLength={3}
        />

        <CLCurrencyInput2
          currencyValue={formInfo.braço || 0}
          setCurrencyValue={(value) => setFormInfo({ ...formInfo, braço: value })}
          label='Circunferência do braço (cm)'
          maxLength={2}
        />

        <CLCurrencyInput2
          currencyValue={formInfo.panturrilha || 0}
          setCurrencyValue={(value) => setFormInfo({ ...formInfo, panturrilha: value })}
          label='Circunferência da panturrilha (cm)'
          maxLength={2}
        />

        <CLCurrencyInput2
          currencyValue={formInfo.abdômen || 0}
          setCurrencyValue={(value) => setFormInfo({ ...formInfo, abdômen: value })}
          label='Circunferência do abdômen (cm)'
          maxLength={2}
        />

        <CLCurrencyInput2
          currencyValue={formInfo.subescapular || 0}
          setCurrencyValue={(value) => setFormInfo({ ...formInfo, subescapular: value })}
          label='Circunferência do subescapular (cm)'
          maxLength={2}
        />

        <CLCurrencyInput2
          currencyValue={formInfo.semiEnvergadura || 0}
          setCurrencyValue={(value) => setFormInfo({ ...formInfo, semiEnvergadura: value })}
          label='Circunferência do semi-envergadura (cm)'
          maxLength={2}
        />

        <StateButton onClick={handleSubmit} type='compact' loading={false}>
          Calcular
        </StateButton>
      </FlexColumn>
    </FlexColumn>
  )
}
