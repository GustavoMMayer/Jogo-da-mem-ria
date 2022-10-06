
import { useEffect, useState } from 'react';
import * as C from './App.styles';


import RestartIcon from './svgs/restart.svg'
import logoImage from './svgs/memoria.png';

import { Button } from './components/Button';
import {InfoItem} from './components/infoItem';
import { GridItem } from './components/GridItem';


import { GridItemType } from './types/gridItemType';
import {items} from './data/items';
import { formatTimeElapsed } from './helpers/formatTimeElapsed';

function App() {

  const [playng, setPlayng] = useState<boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [moveCount, setMoveCount ] = useState<number> (0);
  const [shownCount, setShownCount] = useState<number>(0);
  const [gridItems,setGridItems] = useState<GridItemType[]>([]);

  useEffect(()=>{
    resetAndCreateGrid()
  },[]);

  useEffect (()=>{
    const timer = setInterval(()=>{
      if(playng){
      setTimeElapsed(timeElapsed + 1);
      }
    },1000);
    return()=> clearInterval(timer);
  },[playng, timeElapsed]);

  //verificar se os abertos são iguais
useEffect(()=>{
  if(shownCount ===2){
    let opened = gridItems.filter(item=>item.shown===true);
    if(opened.length ===2){
            // v1 se eles são iguais, tornalos permanetes
      if(opened[0].item === opened[1].item){
        let tmpGrid = [...gridItems];
        for( let i in tmpGrid){
          if(tmpGrid[i].shown){
            tmpGrid[i].permanentShown =true;
            tmpGrid[i].shown = false;
          }
        }
        setGridItems(tmpGrid);
        setShownCount(0); 
      } else {
        //v2 fechar se forem diferentes
        setTimeout(()=>{
          let tmpGrid = [...gridItems];
        for( let i in tmpGrid){
          tmpGrid[i].shown = false;
        }
        setGridItems(tmpGrid);
        setShownCount(0); 
        },1000);
     }
       setMoveCount(moveCount => moveCount+1);    
    }
  }
},[shownCount, gridItems]);

//verificação se o jogo acabou
useEffect(()=>{
  if(moveCount > 0 && gridItems.every(item=>item.permanentShown === true)){
    setPlayng(false);
    alert("Parabéns!!! Você venceu o Jogo!!");
  }
},[moveCount, gridItems]);

  const resetAndCreateGrid = ()=>{
    // passo 1 um resetar o jogo
    setTimeElapsed (0);
    setMoveCount(0);
    setShownCount(0);
    
    //passo 2 Criar o grid 
   
    //2.1  Criar um grid vazio
    let tmpGrid: GridItemType[] = [];
    for(let i=0; i<(items.length*2); i++){
      tmpGrid.push({
        item: null,
        shown:false,
        permanentShown: false
      });

    }

    // 2.2 preencher o grid

    for(let w=0; w < 2;w++){
      for(let i=0; i<items.length; i++){
        let pos = -1;
        while(pos<0 || tmpGrid[pos].item !==null){
        pos = Math.floor(Math.random()*(items.length*2));
        }
        tmpGrid[pos].item = i;
      }
    };

    //2.3 jogar no state
    setGridItems(tmpGrid);

    //3 comessar o jogo
    setPlayng(true);
  }

  const handleItemClick = (index: number) =>{
    if(playng && index !==null && shownCount<2){
      let tmpGrid = [... gridItems];

      if (tmpGrid[index].permanentShown===false && tmpGrid[index].shown === false){
        tmpGrid[index].shown = true;
        setShownCount(shownCount+1);
      }   
      setGridItems(tmpGrid);
    }
  }


    return (
   <C.Container>
    <C.Info>
    <C.LogoLink href=''>
        <img src={logoImage} width="40" alt=""/>
        <C.LogoTitle>
          Jogo da Memória 
        </C.LogoTitle>
  </C.LogoLink>


      <C.InfoArea>
        <InfoItem label='Tempo' value= {formatTimeElapsed(timeElapsed)} />
        <InfoItem label='Movimentos' value={moveCount.toString()}/>
      </C.InfoArea>

      <Button label='Reiniciar' icon={RestartIcon} onClick={resetAndCreateGrid} />


    </C.Info>
    <C.GridArea>
      <C.Grid>
        {gridItems.map((item, index)=>(
          <GridItem 
          key={index}
          item = {item}
          onClick = {() => handleItemClick(index)}
          />         
                 ))};
      </C.Grid>
    </C.GridArea>
   <C.Footer>
    Projeto desenvolvido por Gustavo Mayer, durante curso FullSatack da B7Web.
  </C.Footer>     

   </C.Container>

  
)};

export default App
