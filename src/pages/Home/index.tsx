import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputDefault, InputName } from '../../components/InputDefault';
import { ModalAttDel} from '../../components/Modal';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {  KeyData, RecadoData } from '../../store/modules/typeStore';
import { buscarRecados, getRecadosUser, newRecado, getRecadosUserbyKey, getRecadosArquivados } from '../../store/modules/recados/recadoSlice';

// import { DarkTheme, LightTheme } from '../../themes';

function Home(){

  const [description, setDescription] = useState('');
  const [keyBusca, setKeyBusca] = useState('');
  const [detail, setDetail] = useState('');
  const [idSelec, setIdSelec] = useState('');
  const [mode, setMode] = useState<'normal' | 'arquivado' | 'filtro'>('normal')
  const [modeModal, setModeModal] = useState<'editarRecado' | 'deletarRecado' | 'arquivarRecado' | 'desarquivarRecado'>('editarRecado');
  const [openModal, setOpenModal] = useState(false)
  const [loading, setLoading] = useState(false)


// const userLogged = useAppSelector((state) => state.userLogged);
  const respostaRecados = useAppSelector((state) => state.recados);
  const recadosRedux = useAppSelector(buscarRecados)
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userLoggeID = () => { return JSON.parse(localStorage.getItem('userLoggedId') || "") };
  const ID = userLoggeID()
  
// const {toggleTheme} = useAppThemeContext()
    useEffect(() => { if(ID === ""){ navigate('/') }}, [navigate, ID] );
  
    useEffect(() => {  
      if(respostaRecados.loading === true){
          setLoading(true)
          console.log('carregando');
      }
    
      if(respostaRecados.loading === false){
          setLoading(false)
          console.log('carregado');
      }
    },
      [respostaRecados.loading]
    );
  
    useEffect(() => {atualizar()},[]);
  
    const mudarInput = (value:string, key:InputName) => {
      switch(key) {
        case 'description':
          setDescription(value);
        break; 
        case 'detail':
          setDetail(value);
        break;
        case 'key':
          setKeyBusca(value);
        break;
        default:
      }
    };
  
    const atualizar = () => { dispatch(getRecadosUser(ID)) };
  
    const salvarRecado = () => {
      if(description === '' || detail === ''){
        alert('Campos vazios não são permitidos')
        return 
      }
      const novoRecado: RecadoData = {
        idUser: ID,
        description,
        detail,
        check: false
      }
  
      dispatch(newRecado(novoRecado));
      setMode('normal')
      atualizar()
      limpaCampos();
    };
  
    const limpaCampos = () => {
      setDescription('')
      setDetail('')
    };
  
    const logOut = () => { localStorage.setItem('userLoggedId', JSON.stringify('')); navigate('/') };
  
    const editMessage = (id: string) => {
      setModeModal('editarRecado');
      setIdSelec(id);
      setOpenModal(true);  
    };
  
    const deleteMessage = (id: string) => {
      setModeModal('deletarRecado');
      setIdSelec(id);
      setOpenModal(true); 
    };
  
    const buscarArquivados = () => {
      dispatch(getRecadosArquivados(ID))
      setMode('arquivado')
    };
  
    const buscarRecadosNormais = () => {
      dispatch(getRecadosUser(ID))
      setMode('normal')
    };
  
    const arquivarMessage = (id: string) => {
      setModeModal('arquivarRecado');
      setIdSelec(id);
      setOpenModal(true);
    };
      
    const desarquivarMessage = (id: string) => {
      setModeModal('desarquivarRecado');
      setIdSelec(id);
      setOpenModal(true);
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
  
    const handleCloseModal = () => { setOpenModal(false) };
  
  



    
  return (
    <Box minWidth={300} width="100%" height="100%" overflow="hidden">
      <Grid m={5}>


        <Grid mb={5} display={'flex'} justifyContent={'right'} alignItems={'center'} >
          <Button onClick={logOut} variant='contained' color='error'><ExitToAppIcon />| Sair</Button></Grid>
        
        <Grid mb={3}>
          <InputDefault type='text' label='Descrição' name='description' value={description} color='primary' handleChange={mudarInput}/></Grid>

        <Grid mb={5}>
          <InputDefault type='text' label='Detalhamento' name='detail' value={detail} color='primary' handleChange={mudarInput}/></Grid>
            
        <Grid mb={5}>
          <Button variant='contained' color='primary' size='small' onClick={salvarRecado}>Salvar</Button></Grid >



        <Grid mb={3} display={'flex'} maxWidth={450}>
          <InputDefault type='text' label='Pesquisar' name='key' value={keyBusca} color='primary' handleChange={mudarInput} />
          
            {mode === ('normal') && (
              <Button variant='contained' color='primary' size='large' onClick={buscarKey}>Buscar</Button>)}
            {mode === ('arquivado') && (
              <Button variant='contained' color='primary' size='large' onClick={buscarKey}>Buscar</Button>)}
            {mode === ('filtro') && (
              <Button variant='contained' color='primary' size='large' onClick={buscarKey}>Exibir Lista Completa</Button>)}
        </Grid>

          <Grid>
              {mode === 'normal' && (
                <Button variant='contained' color='primary' size='large' onClick={buscarArquivados}>Exibir Favoritos</Button>)}
              {mode === 'arquivado' && (
                <Button variant='contained' color='primary' size='large' onClick={buscarRecadosNormais}>Exibir Todos</Button>)}
          </Grid>
          
          <Grid>
            <Grid maxWidth={800}>
              <TableContainer component={Paper}>
                <Table aria-label="simple table" >
                  <TableHead>
                    <TableRow >
                      <TableCell align="center">ID</TableCell>
                      <TableCell align="center">Descrição</TableCell>
                      <TableCell align="center">Detalhamento</TableCell>
                      <TableCell align="center">Ações</TableCell>
                    </TableRow>
                  </TableHead>
                <TableBody>
                  {recadosRedux.map((row, index) => (
                    <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component="th" scope="row" align="center">{index + 1}</TableCell>
                      <TableCell align="center">{row.description}</TableCell>
                      <TableCell align="center">{row.detail}</TableCell>
                      <TableCell align="center">
                        <Button color='success' variant='contained' sx={{ margin: '0 15px' }} onClick={() => editMessage(row.id)}><CreateOutlinedIcon /></Button>
                        <Button color='success' variant='contained' sx={{ margin: '0 15px' }} onClick={() => deleteMessage(row.id)}><CreateOutlinedIcon /></Button>
                        <Button color='success' variant='contained' sx={{ margin: '0 15px' }} onClick={() => arquivarMessage(row.id)}><CreateOutlinedIcon /></Button>
                        <Button color='error' variant='contained' sx={{ margin: '0 15px' }} onClick={() => desarquivarMessage(row.id)}><DeleteForeverOutlinedIcon /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
            <ModalAttDel mode={modeModal} id={idSelec} open={openModal} handleClose={handleCloseModal}/>
          </Grid>
        </Box>
    )
};

export { Home };




// function Home() {
//     const navigate = useNavigate();
//     const [description, setDescription] = useState('')
//     const [detail, setDetail] = useState('')
//     const [idSelecionado, setIdSelecionado] = useState('')  
//     const [mode, setMode] = useState<'edit' | 'delete' | ''>('');   
//     const [openModal, setOpenModal] = useState(false)
//     const userLogged = useAppSelector((state) => state.userLogged)   
//     const usuarioRedux = useAppSelector((state) => buscarUsuarioPorEmail(state, userLogged.email)) 
//     const recadosRedux = useAppSelector(buscarRecados)
//     const dispatch = useAppDispatch();

//     useEffect(
//         () => {         

//             if(!userLogged.email) {
//               navigate('/')
//             }
//             if(usuarioRedux) {
//                 dispatch(adicionarRecados(usuarioRedux.recados))
//             }
//         },
       
//         [navigate, userLogged, usuarioRedux, dispatch]
//     )

//     const mudarInput = (value: string, key: InputName) => {
//         switch(key) {
//             case 'description':
//                 setDescription(value)
//             break;

//             case 'detail':
//                 setDetail(value)
//             break;

//             default:
//         }
//     };

//     const handleSaveAndLogout = () => {
//         console.log('user', userLogged)
//         if(recadosRedux) {
//             dispatch(atualizarUsuario({id: userLogged.email, changes: {recados: recadosRedux}}))
//         }
//         dispatch(clearUsuarioLogado())
//         dispatch(limparRecados())
//         navigate('/')
//     };

//     const handleSaveRecado = () => {
//         const novoRecado: Recado = {
//             id: uuid(),
//             description,
//             detail
//         }
//         dispatch(adicionarNovoRecado(novoRecado))
//         handleClear()
//     };

//     const handleEdit = (id: string) => {
//         setMode('edit');
//         setIdSelecionado(id);
//         setOpenModal(true);
//     };

//     const handleDelete = (id: string) => {
//         setMode('delete');
//         setIdSelecionado(id);
//         setOpenModal(true)
//     };

//     const handleCloseModal = () => {
//         setOpenModal(false);    
//     };

//     const handleClear = () => {
//         setDescription('')
//         setDetail('')     
//         setMode('')   
//     };