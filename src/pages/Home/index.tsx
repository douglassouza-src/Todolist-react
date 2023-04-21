import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputDefault, InputName } from '../../components/InputDefault';
import { ModalAttDel} from '../../components/Modal';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { KeyData, RecadoData } from '../../store/modules/typeStore';
import { buscarRecados, getRecadosUser, newRecado, getRecadosUserbyKey, getRecadosArquivados } from '../../store/modules/recados/recadoSlice';
import { Box, Button, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import EditIcon from '@mui/icons-material/Edit';
import GradeIcon from '@mui/icons-material/Grade';
import StarBorderIcon from '@mui/icons-material/StarBorder';

// import { DarkTheme, LightTheme } from '../../themes';

function Home(){

  const [description, setDescription] = useState('');
  const [keyBusca, setKeyBusca] = useState('');
  const [detail, setDetail] = useState('');
  const [idSelec, setIdSelec] = useState('');
  const [mode, setMode] = useState<'normal' | 'arquivado' | 'filtro'>('normal')
  const [modeModal, setModeModal] = useState<'editarRecado' | 'deletarRecado' | 'arquivarRecado' | 'desarquivarRecado'>('editarRecado');
  const [openModal, setOpenModal] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false);

  // const userLogged = useAppSelector((state) => state.userLogged);
  const respostaRecados = useAppSelector((state) => state.recados);
  const recadosRedux = useAppSelector(buscarRecados);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userLoggeID = () => { return JSON.parse(localStorage.getItem('userLoggedId') || "") };
  const ID = userLoggeID()
  // const {toggleTheme} = useAppThemeContext()

    useEffect(() => { if(ID === ""){ navigate('/') }}, [navigate, ID] );
  
    useEffect(() => { 
      if(respostaRecados.loading === true){ setLoading(true) }
      if(respostaRecados.loading === false){ setLoading(false) }
    },[respostaRecados.loading]
    );
  
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {atualizar()},[]);
  
    const mudarInput = (value:string, key:InputName) => {
      switch(key) {
        case 'description': setDescription(value);
        break; 
        case 'detail': setDetail(value);
        break;
        case 'key':setKeyBusca(value);
        break;
        default:
      }
    };
  
    const atualizar = () => {dispatch(getRecadosUser(ID))};
  
    const salvarRecado = () => {
      if(description === '' || detail === ''){
        alert('Preencha todos os campos!')
        return 
      }
      const novoRecado: RecadoData = {
        idUser: ID,
        description,
        detail,
        check: false
      };
  
      dispatch(newRecado(novoRecado));
      setMode('normal')
      atualizar()
      limpaCampos();
    };

    const buscarKey = () => {
      if(keyBusca === ""){
        dispatch(getRecadosUser(ID))
        setMode('normal')
        return
      };
    
      const chaveBuscaData: KeyData = {
        idUser: userLoggeID(),
        key: keyBusca
      }
      setKeyBusca('')
      setMode('filtro')
      dispatch(getRecadosUserbyKey(chaveBuscaData))
    };
  
    
  
    const logOut = () => { localStorage.setItem('userLoggedId', JSON.stringify('')); navigate('/') };

    const limpaCampos = () => { setDescription(''); setDetail('') };
  
    const editMessage = (id: string) => { setModeModal('editarRecado'); setIdSelec(id);setOpenModal(true) };
  
    const deleteMessage = (id: string) => { setModeModal('deletarRecado'); setIdSelec(id);setOpenModal(true) };
  
    const buscarArquivados = () => { dispatch(getRecadosArquivados(ID)); setMode('arquivado') };
  
    const buscarRecadosNormais = () => { dispatch(getRecadosUser(ID)); setMode('normal') };
  
    const arquivarMessage = (id: string) => { setModeModal('arquivarRecado');setIdSelec(id);setOpenModal(true) };
      
    const desarquivarMessage = (id: string) => { setModeModal('desarquivarRecado');setIdSelec(id);setOpenModal(true) };
  
    const handleCloseModal = () => { setOpenModal(false) };
  
  
    
  return (
    <Box minWidth={450} width="100%" height="100%" overflow="hidden">
      <Grid m={5}>
        <Grid mb={5} mr={-1} display={'flex'} justifyContent={'right'} alignItems={'center'} >
          <Button onClick={logOut} variant='contained' color='error'><ExitToAppIcon />| Sair</Button></Grid>

        <Grid display={'flex'} minWidth={430} maxWidth={800} margin={'auto'} style={{  backgroundColor: 'GrayText' }} >
          <InputDefault type='text' label='Descrição' name='description' value={description} color='primary' handleChange={mudarInput} />
          <InputDefault type='text' label='Detalhamento' name='detail' value={detail} color='primary' handleChange={mudarInput} />
          <Button variant='contained' color='primary' size='large' onClick={salvarRecado}>Salvar</Button>
        </Grid >
      </Grid>

      <Grid maxWidth={400} display={'flex'} margin={'auto'} style={{ backgroundColor: 'GrayText' }}>
        <InputDefault type='text' label='Pesquisar' name='key' value={keyBusca} color='primary' handleChange={mudarInput} />
        {mode === ('normal') && (
          <Button variant='contained' color='primary' size='large' onClick={buscarKey}>Buscar</Button>)}
        {mode === ('arquivado') && (
          <Button variant='contained' color='primary' size='large' onClick={buscarKey}>Buscar</Button>)}
        {mode === ('filtro') && (
          <Button variant='contained' color='primary' size='large' onClick={buscarKey}>Voltar</Button>)}
      </Grid>



      <Grid maxWidth={1200} minWidth={425} margin={'auto'} mt={8}>
        <Grid display={'flex'} maxHeight={30} >
          {mode === 'normal' && (<Button variant='contained' color='primary' size='large' onClick={buscarArquivados}>Exibir Favoritos</Button>)}
          {mode === 'arquivado' && (<Button variant='contained' color='primary' size='large' onClick={buscarRecadosNormais}>Exibir Todos</Button>)}
        </Grid>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow style={{ border: '3px black solid' }} >
                <TableCell align="center" style={{ background: 'black', fontSize: 15, color: 'whitesmoke', borderRight: '1px white solid' }}>ID</TableCell>
                <TableCell align="center" style={{ background: 'black', fontSize: 15, color: 'whitesmoke', borderRight: '1px white solid' }}>Descrição</TableCell>
                <TableCell align="center" style={{ background: 'black', fontSize: 15, color: 'whitesmoke', borderRight: '1px white solid' }}>Detalhamento</TableCell>
                <TableCell align="center" style={{ background: 'black', fontSize: 15, color: 'whitesmoke' }}>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recadosRedux.map((row: any, index: any) =>
                <TableRow component="th" scope="row" key={row.id}>
                  <TableCell align="center" style={{ fontSize: 15 }} >{index + 1}</TableCell>
                  <TableCell align="center" style={{ fontSize: 17 }} >{row.description}</TableCell>
                  <TableCell align="center" style={{ fontSize: 17 }} >{row.detail}</TableCell>

                  <TableCell align="center">
                    {mode === 'normal' && <Tooltip title="Editar" onClick={() => editMessage(row.id)}><IconButton><EditIcon /></IconButton></Tooltip>}
                    <Tooltip title="Deletar" onClick={() => deleteMessage(row.id)}><IconButton><DeleteForeverOutlinedIcon /></IconButton></Tooltip>
                    {mode === 'normal' && (
                      <Tooltip title="Arquivar" onClick={() => arquivarMessage(row.id)}><IconButton><GradeIcon /></IconButton></Tooltip>)}
                    {mode === 'arquivado' && (
                      <Tooltip title="Desarquivar" onClick={() => desarquivarMessage(row.id)}><IconButton><StarBorderIcon /></IconButton></Tooltip>)}
                  </TableCell>

                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <ModalAttDel mode={modeModal} id={idSelec} open={openModal} handleClose={handleCloseModal} />
    </Box>
     )
};

export { Home };
