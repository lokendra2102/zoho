import React, { useContext, useState } from 'react'
import {
    Container,
    Button,
    Col,
    Card,

} from 'react-bootstrap'
import { BsCartPlus,BsStarFill,BsStarHalf,BsStar } from 'react-icons/bs'
import { IoWalletOutline,IoHeartOutline } from 'react-icons/io5'
// import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { IconContext } from 'react-icons'

import im from '../../Images/971.jpg'
import Login from '../Modals/Login'
import { BookContext } from '../../Context/App.context'

function Cards({data,k}) {
    const { isLoggedIn } = useContext(BookContext)
    const [show, setShow] = useState(false);

    const star = Math.round(data.vote_average/2);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleClick = () => {
        if (isLoggedIn){
            handleShow()
        }else{
            console.log("YES")
        }
    }

    return (
        <>
            <Col key={k} xs={12} sm={6} md={6} lg={4} xl={4} xxl={3} className="mb-3">
                <Card className='w-100 border-0 card_parent text-center p-3 shadow'>
                    <Container fluid className='card_img_container'>
                        <Card.Img variant="top" className='card_img' src={`https://image.tmdb.org/t/p/original/${data.poster_path}`} />
                        <Button className='heart_btn shadow'>
                            <IconContext.Provider value = {{className:"heart_icon"}}>
                                <IoHeartOutline />
                            </IconContext.Provider>
                        </Button>
                        <Button className='rating_btn shadow'>
                            <p className='rating_text mb-0 fs-6'>{data.vote_average}</p>
                            {/* <IconContext.Provider value = {{className:"load_icon position-absolute"}}>
                                <AiOutlineLoading3Quarters />
                            </IconContext.Provider> */}
                        </Button>
                    </Container>
                    <Card.Body className='shadow-sm mx-4 card_body'>
                        <Card.Title className='fs-5 book_name'>{data.original_title}</Card.Title>
                        <Card.Title className='fs-6 book_author'>Popularity : {data.popularity}</Card.Title>
                        <Card.Text className='book_desc'>
                            {data.overview}
                        </Card.Text>
                        {/* <Container fluid className='rating_book my-1'>
                            
                            { [ Math.round(data.vote_average/2)].map(e => {
                                return(
                                    <IconContext.Provider key={e} value = {{className:"star rating_star_fill me-1"}}>
                                        <BsStarFill/> 
                                    </IconContext.Provider>
                                )
                                })
                            }
                            <IconContext.Provider value = {{className:"star rating_star_half_fill me-1"}}>
                                <BsStarHalf/> 
                            </IconContext.Provider>
                            <IconContext.Provider value = {{className:"star rating_star_no_fill me-1"}}>
                                <BsStar/> 
                            </IconContext.Provider>
                        </Container> */}
                        <Card.Text className='book_release'>
                        Released On : {data.release_date}
                        </Card.Text>
                        <Card.Text className='book_release'>
                        Certificate : <span className='fw-bold text-dark'>{data.adult ? "A" : "U/A"}</span>
                        </Card.Text>
                        <Container fluid className='d-flex gap-3 justify-content-center'>
                            <Button variant="danger" onClick={handleClick} className='cart_btn shadow-none'>
                                <IconContext.Provider value = {{className:"card_icon"}}>
                                    <BsCartPlus />
                                </IconContext.Provider>
                            </Button>
                            <Button variant="dark" className='fs-6 buy_btn shadow-none d-flex justify-content-center align-items-center text-uppercase'>
                                <IconContext.Provider value = {{className:"card_icon1"}}>
                                    <IoWalletOutline/> 
                                </IconContext.Provider>
                                <p className='mb-0 buy_text'>Watch</p>
                            </Button>
                        </Container>
                    </Card.Body>
                </Card>
            </Col>
            <Login show={show} handleShow={handleShow} handleClose={handleClose} />
        </>
    )
}

export default Cards