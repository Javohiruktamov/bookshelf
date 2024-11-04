import React, { useRef, useState, useEffect } from 'react';
import { Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Card, CardContent, Typography, IconButton, Alert } from '@mui/material';
import PrimarySearchAppBar from '../MUI/AppBar/AppBar';
import CardWrapper from '../CardWrapper/CardWrapper';
import "./Home.scss";
import { styled } from '@mui/material/styles';
import { DeleteForever, EditOutlined } from "@mui/icons-material";

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const Home = () => {
  const [open, setOpen] = useState(false);
  const [showModalViseble, setshowModalViseble] = useState(false)
  const [books, setBooks] = useState([]);
  const [editingBooks, seteditingBooks] = useState(false)

  let [title, settitle] = useState("")
  let [author, setauthor] = useState("")
  let [page, setpage] = useState("")
  let [description, setdesciription] = useState("")

  const showModal = (books) => {
    seteditingBooks(books)
    setshowModalViseble(true)
    settitle(books.title)
    setauthor(books.author)
    setpage(books.pages)
    setdesciription(books.description)
    console.log(books)
  }

  const handleCancel = () => {
    setshowModalViseble(false)
  }
  const handleSave = () => {
    const updatingBooks = { ...editingBooks, title, author, page, description }

    fetch(`http://localhost:5000/products/${editingBooks.id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(updatingBooks)
    })
      .then(res => res.json())
      .then(() => {
        setBooks((prevBooks) =>
          prevBooks.map((item) =>
            item.id === updatingBooks.id ? updatingBooks : item
          )
        );
        setshowModalViseble(false)
      })
  }



  const titleRef = useRef(null);
  const authorRef = useRef(null);
  const pagesRef = useRef(null);
  const descriptionRef = useRef(null);
  const imageRef = useRef(null);



  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCreateBook = () => {
    const file = imageRef.current.files[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64Image = reader.result;

        const data = {
          image: base64Image,
          title: titleRef.current.value,
          author: authorRef.current.value,
          pages: pagesRef.current.value,
          description: descriptionRef.current.value,
        };
        fetch("http://localhost:5000/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        })
          .then(res => res.json())
          .then(data => console.log(data))


        handleClose();
      };
      reader.onerror = error => {
        console.error("Faylni o‘qishda xato:", error);
      };

    }
  };
  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then(res => res.json())
      .then((data) => setBooks(data))
  }

  )
  const handleEdit = e => {
    console.log(e);
  }
  const handleDelete = id => {
    fetch(`http://localhost:5000/products/${id}`, {
      method: "DELETE"
    })
      .then(res => {
        if (res.ok) {
          setBooks(books.filter(item => item.id != id))

        }
      })
  }

  return (
    <div className="home">
      <header>
        <PrimarySearchAppBar />
      </header>
      <div className="container">
        <span>
          <h1>You have got <span>{books.length} books</span></h1>
          <p>Your book today</p>
        </span>
        <StyledButton variant="contained" onClick={handleClickOpen}>
          + Create Book
        </StyledButton>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Create a New Book</DialogTitle>
          <DialogContent>
            <TextField
              inputRef={imageRef}
              autoFocus
              margin="dense"
              label="Book Cover Image"
              type="file"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              inputRef={titleRef}
              margin="dense"
              label="Book Title"
              type="text"
              fullWidth
            />
            <TextField
              inputRef={authorRef}
              margin="dense"
              label="Author"
              type="text"
              fullWidth
            />
            <TextField
              inputRef={pagesRef}
              margin="dense"
              label="Pages"
              type="text"
              fullWidth
            />
            <TextField
              inputRef={descriptionRef}
              margin="dense"
              label="Description"
              type="text"
              fullWidth
              multiline
              rows={2}
            />
          </DialogContent>
          <DialogActions>
            <StyledButton onClick={handleClose} color="primary">
              Close
            </StyledButton>
            <StyledButton onClick={handleCreateBook} color="primary">
              Create
            </StyledButton>
          </DialogActions>
        </Dialog>
      </div>
      <CardWrapper>
        {books.map((book) => (
          <Card key={book.id} className="card" sx={{ position: "relative" }}>
            <div style={{ position: "relative" }}>
              {book.image ? (
                <img src={book.image} alt={book.title} />
              ) : (
                <p>No image available</p>
              )}
              <Typography variant="h5">{book.title}</Typography>
              <Typography variant="subtitle1">Author: {book.author}</Typography>
              <Typography variant="body2">Pages: {book.pages}</Typography>
              <Typography variant="body2">Description: {book.description}</Typography>
            </div>

            <div
              className="card-icons"
            >
              <IconButton onClick={() => { showModal(book) }} color="primary">
                <EditOutlined />
              </IconButton>
              <IconButton onClick={() => { handleDelete(book.id) }} color="secondary">
                <DeleteForever />
              </IconButton>
            </div>
          </Card>
        ))}
      </CardWrapper>
      <Dialog open={showModalViseble} onClose={handleCancel}>
        <DialogContent>

          <TextField
            value={title}
            onChange={(e) => settitle(e.target.value)}
            margin="dense"
            label="Book Title"
            type="text"
            fullWidth
          />
          <TextField
            value={author}
            onChange={(e) => setauthor(e.target.value)}
            margin="dense"
            label="Author"
            type="text"
            fullWidth
          />
          <TextField
            value={page}
            onChange={(e) => setpage(e.target.value)}
            margin="dense"
            label="Page"
            type="text"
            fullWidth
          />
          <TextField
            value={description}
            onChange={(e) => setdesciription(e.target.value)}
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            multiline
            rows={2}
          />
        </DialogContent>
        <DialogActions>
          <StyledButton onClick={handleCancel} color="primary">
            Close
          </StyledButton>
          <StyledButton onClick={handleSave} color="primary">
            Create
          </StyledButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Home;
