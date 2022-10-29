import React from 'react'
import ShopWomen from './../../assets/ShopWomen.png'
import ShopMen from './../../assets/ShopMen.png'
import './styles.scss'

function Directory() {
    return (
        <div className="directory">
            <div className="wrap">
                <div className="item" style={{backgroundImage: `url(${ShopWomen})`}}>
                    <a>Shop Women</a>
                </div>

                <div className="item" style={{backgroundImage: `url(${ShopMen})`}}>
                    <a>Shop Men</a>
                </div>
            </div>
        </div>
    )
}

export default Directory
