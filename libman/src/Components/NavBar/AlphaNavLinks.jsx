import React, { useEffect } from 'react'
import { useState } from 'react'
import {
    Container,
} from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'

function AlphaNavLinks() {

  const [ Active,IsActive ] = useState("")
  const navigate = useNavigate()
  const ToggleClass = (e) => {IsActive(e)}

  const loc = useLocation()
  useEffect(() => {
    if(loc.pathname !== "/search/s"){
      IsActive("")
    }
  },[loc])

  return (
    <Container className='alphabet_container d-flex justify-content-center mt-4 text-center'>
        {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(e => {
            return (
                <p key={e} className={`${Active === e ? "activeAplha":""} alphabets pe-2 fs-5`} 
                  onClick={(i) => {
                    ToggleClass(e)
                    navigate(`/search/s?name=${e}`)
                  }}
                >{e}</p>
            )
        })}
    </Container>
  )
}
//{`${e === 'A' ? 'activeAplha' : '' }
export default AlphaNavLinks