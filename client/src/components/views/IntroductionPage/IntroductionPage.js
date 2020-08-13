import React from 'react';
import { ArrowRightOutlined, CheckOutlined, InstagramOutlined} from '@ant-design/icons';
import './Introduction.css';

function IntroductionPage() {
  return (
    <div className="background">
      <div className="top">
        <h1> About Us</h1>
        <br />
        Healty & Home Baked (나의 건강을 위해 만든빵)
        <br />
        No White Flour, No White Sugar, No Butter!
        <br />
        Korean authentic flavors #할미입맛저격
        <br /><br /> <br />
        <br />
        <h1>Who's Baking</h1>
          Gina
          <br />
          Safeway Pharmacy Manager
        <br /><br /> <br />
        <h1>Ingredients</h1>
        <CheckOutlined />	Why no white flour and white sugar? <br/>
        <CheckOutlined />	Flour <ArrowRightOutlined /> Whole Wheat Flour & Almond Flour <br />
        <CheckOutlined />	Sugar <ArrowRightOutlined /> Honey, Maple Syrup, Coconut Sugar <br />
        <CheckOutlined />	Butter <ArrowRightOutlined /> Plant Based Oil, Plant Based Milk, and Greek yogurt <br />
        <CheckOutlined />	Mugwort (Ssuk) <br />
        <CheckOutlined />	Injeolmi (Roasted Beans) <br />
        <CheckOutlined />	Black Sesame <br />
        <CheckOutlined />	Chickpea <br />
        <br /> <br /><br /> <br />
        instagram <br />
        <a href="https://www.instagram.com/ouro.harmi.bbang/"><InstagramOutlined style= {{ fontSize: '40px', color: 'black'}}/></a>
      </div>
    </div>
  )
}

export default IntroductionPage
