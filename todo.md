# Peso e altura estimado -> Calcula o peso e a altura estimada + IMC
Input: Sexo(Homem ou Mulher)
Input: Etnia(Negro ou Branco)
Input: Altura do joelho(cm)
Input: Altura(cm)
Input: (idade)
Input: Circunferência do braço(cm)
Input: Circunferência de panturrilha(cm)
Input: Circunferência de abdômen(cm)
Input: Espessura de dobra cutânea subescapular(cm)
Input: Semi-envergadura(cm)

## Formula de ALTURA mais recomendada para HOMENS por Chumlea et al: OK
Requisitos: Altura do joelho e idade;

Cálculos: 
Mulheres Brancas: Altura = 70,25 + (1,87 x Altura do joelho) - (0,06 x idade)
Mulheres Negras: Altura = 68,1 + (1,86 x Altura do joelho) - (0,06 x idade)
Homens Brancos: Altura = 71,85 + (1,88 x Altura do joelho)
Homens Negros: Altura = 73,42 + (1,79 x Altura do joelho)


## Formula de PESO mais recomendada para MULHERES por Chumlea et al: OK
Requirements 1: joelho, braço, panturrilha e subescapular
Requirements 2: abdomen, braço, panturrilha e sexo
Peso Corporal(kg) - (0,87 x Altura do joelho) + (0,98 x circunferência de braço) + (1,27 x circuferência de panturrilha) + (0,4 x espessura de dobra cutânea subescapular) - 62,35

Alternativa: Peso Corporal(kg) - (0,5263 x circunferência de abdomen) + (0,5759 x circunferência de braço) + (1,2452 x circuferência de panturrilha) - (4,8689 x sexo) - 32,9241 // Homem = 1, Mulher = 2


## Formula de PESO mais recomendada para HOMENS por Rabito et al: OK
requirements 1: braço, abdomen, panturrilha
Peso Corporal(kg) - (0,4808 x Circunferência de braço) + (0,5646 x circunferência de abdômen) + (1,3160 x circuferência de panturrilha) - 42,2450

## Formula de ALTURA mais recomendada para MULHERES por Rabito et al:
requirements: sexo, idade, semi-envergadura
Altura = 63,525 – (3,237 x sexo) – (0,06904 x idade) + (1,293 x semi-envergadura)

Homem: 1, Mulher: 2

Hierarquia Mulher:



## Cálculo do IMC: peso / altura^2
    Data: <> 16,9: muito abaixo do peso
    Data: 17-18,4: abaixo do peso
    Data: 18,5-24,9: peso normal
    Data: 25-29,9: acima do peso
    Data: 30-34,9: obesidade grau 1
    Data: 35-40: obesidade grau 1
    Data: > 40: obesidade grau 1
    Idosos:
    < 22: desnutrição
    22-27: eutrofia
    > 27: obesidade



# Adequação de circunferência braquial(braço); -> Adequação + Diagnóstico
Requirements: CB obtida, idade, sexo
Adequação da CB = CB obtida(cm) x 100 / CB P50(cm)
ANOTAR TABELA
Resultados:
    < 70%: desnutrição grave
    70% - 80%: desnutrição moderada
    80% - 90%: desnutrição leve
    90% - 110%: eutrofia
    110% - 120%: sobrepeso
    > 120%: obesidade


# Peso ideal; -> Peso ideal(range) + IMC Atual
Requirements: Altura, idade, peso

 peso / altura^2 -> Altura é fixo, buscar IMC 18,5- 24,9
 Calcular peso pra IMC 18,5
 Calcular peso pra IMC 24,9
 Peso ideal vai ser o valor entre os dois resultados
 Para idoso:
Calcular peso pra IMC 22
 Calcular peso pra IMC 27
 Peso ideal vai ser o valor entre os dois resultados

-------------------------------------------



# Peso ajustado (edemas, amputacoes) -> Peso Ajustado

Requirements: Peso, Amputação, Edema, Ascite
Inputs: 
Peso
Amputação? Sim ou Não
Membro? Multi Select
Quantos? 1 ou 2
Cálculo: Peso - % somado dos membros perdidos baseado na tabela
Edema? Sim ou não
    Membro? Seleciona membro
Ascite? Sim ou não
    Leve, Moderado ou Grave?
Cálculo: Peso - % somado dos membros perdidos baseado na tabela - peso do edema segundo tabela - Ascite

Tabela Amputação:
Mão: 0,8%
Braço até o ombro: 2,3%
Pé: 1,7%
Perna abaixo do joelho: 7%
Perna acima do joelho: 11%
Perna inteira: 18,6%

Tabela: Valores a ser subtraída a partir do edema
Tornozelo(2): 1kg
Joelho(2): 3-4kg
Raiz de coxa(2): 5-6kg
Anasarca(1): 10-12kg

Tabela Ascite 2:
Leve - 2,2kg
Moderado - 6kg
Grave - 14kg

No final: Adicionar um Buy me a Coffee
Instagram Lucas e meu 


-> Component que mostra o resultado
-> Realizar cálculos
-> Página de resultados pra cada cálculo
-> Se precisar de um backend, fazer em GO