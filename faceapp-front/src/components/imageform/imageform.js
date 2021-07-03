import React from 'react';
import './imageform.css'

const ImageLinkForm = ({onInputChange,onSubmit}) => {
    return (
      <div>
        <p className='f3 center white'>
          {'Face detection'}
        </p>
        <div className='center'>
          <div className='form center  pa4 br3 shadow-8'>
            <input className='f4 pa2 w-70 center' type='tex' onChange={onInputChange}/>
            <button
              className='w-30 grow f4 link ph3 pv2 dib white bg-orange' onClick={onSubmit}
            >Detect</button>
          </div>
        </div>
      </div>
    );
  }

export default ImageLinkForm;