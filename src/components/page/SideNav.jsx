import useProduct from '../../hooks/useProduct'

import { 
    ClockCircleFilled, 
    CloseOutlined,
    MailFilled, 
    PhoneFilled, 
    FacebookFilled,
    TwitterCircleFilled, 
    InstagramFilled
 } from '@ant-design/icons'
 

const SideNav = () => {
    const { products } = useProduct()
    const {state, dispatch} = useProduct()

    const hideOrShowNav  = () => dispatch({type: "showNav", value: !state.isSideNavVisible })


  return (
    <section className={ state.isSideNavVisible ? "side-nav show" : "side-nav hide"}>
    <div className="head" onClick={hideOrShowNav}><CloseOutlined /> </div>
        <div className="content-div">
            <div className="top">
                <h2>ATTIC BOOKSTORES</h2>
                <p>Lorem ipsum dolor sit amet
                    consectetur adipisicing elit. Optio natus quaerat quisquam corporis! 
                    Distinctio ullam quos autem perspiciatis incidunt sed?</p>
            </div>

            <div className="middle">
                {
                    products
                    .filter((x, ind) => ind < 6)
                        .map(({ imageUrl }, index) => 
                        <img src={imageUrl} key={index} alt={products.name} />
                    )

                }
            </div>

            <div className="bottom">
                <p> <ClockCircleFilled /> Sunday - Saturday: 9:00 AM - 17:00 PM</p>
                <p><MailFilled /> attic.bookstores@gmail.com</p>
                <p><PhoneFilled /> +234 814 301 6904</p>
            </div>

            <div className="links">
                <FacebookFilled />
                <TwitterCircleFilled />
                <InstagramFilled />
            </div>
        </div>

    </section>
  )
}

export default SideNav