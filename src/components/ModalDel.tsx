import { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';
import { DeleteOutline } from '@mui/icons-material';

// TypeScript
type PropType = {
  movie: {
    id: number
    title: string
  },
  handleDelete: Function,
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid steelblue',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  textAlign: 'center' as 'center'
};

const btnStyle = {
  margin: 2
}

const ModalDel = ({ handleDelete, movie }: PropType) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const deleteHandler = () => {
    handleDelete(movie.id);
    handleClose();
  }

  return (
    <div>
      <IconButton onClick={handleOpen}>
        <DeleteOutline />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Voulez-vous supprimer le film {movie.title} ?
            </Typography>
            <Button sx={btnStyle} variant="contained" onClick={deleteHandler}>Oui</Button>
            <Button variant="contained" onClick={handleClose}>Non</Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default ModalDel;
