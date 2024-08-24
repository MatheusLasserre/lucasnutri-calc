import React, { useEffect } from 'react'
import { FlexColumn } from '../utils/Utils'
import { StateButton } from '../utils/Buttons'
import { CommonText } from '../utils/Headers'

export const Tabs: React.FC = () => {

    type TabsProps = "PesoEstimado" | "Adequacao" | "PesoIdeal" | "PesoAJustado"
    const [activeTab, setActiveTab] = React.useState<TabsProps | string>("")
    useEffect(() => {
        const path = window.location.pathname
        if (path.includes('peso-e-altura-estimado')) {
            setActiveTab('PesoEstimado')
        } else if (path.includes('adequacao')) {
            setActiveTab('Adequacao')
        } else if (path.includes('peso-ideal')) {
            setActiveTab('PesoIdeal')
        } else if (path.includes('peso-ajustado')) {
            setActiveTab('PesoAJustado')
        }
    }, [])
    const handleSwitchTab = (tab: TabsProps) => {
        if (tab === 'PesoEstimado') {
            window.location.href = '/peso-e-altura-estimado'
        } else if (tab === 'Adequacao') {
            window.location.href = '/adequacao-de-circunferencia-braquial'
        } else if (tab === 'PesoIdeal') {
            window.location.href = '/peso-ideal'
        } else if (tab === 'PesoAJustado') {
            window.location.href = '/peso-ajustado'
        }
    }
  return (
    <FlexColumn maxWidth='400px' gap='10px' horizontalAlign='center' verticalAlign='flex-start' margin='auto' padding='20px 10px 0 10px'>
        <CommonText
        fontSize='20px'
        fontWeight='700'
        color='white-90'
        marginTop='0'
        textAlign='center'
        lineHeight='22px'
      >
        Cálculos disponíveis
      </CommonText>
        <StateButton onClick={() => handleSwitchTab('PesoEstimado')} type={activeTab === 'PesoEstimado' ? 'outlineCompact' : 'compact'} loading={false}>
            Peso e Altura Estimado
        </StateButton>
        <StateButton onClick={() => handleSwitchTab('Adequacao')} type={activeTab === 'Adequacao' ? 'outlineCompact' : 'compact'} loading={false}>
            Adequação Braquial
        </StateButton>
        <StateButton onClick={() => handleSwitchTab('PesoIdeal')} type={activeTab === 'PesoIdeal' ? 'outlineCompact' : 'compact'} loading={false}>
            Peso Ideal
        </StateButton>
        {/* <StateButton onClick={() => handleSwitchTab('PesoAJustado')} type={activeTab === 'PesoAJustado' ? 'outlineCompact' : 'compact'} loading={false}>
            Peso Ajustado
        </StateButton>  */}
    </FlexColumn>
  )
}
