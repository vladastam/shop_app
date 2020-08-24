import React, { useEffect, useState } from 'react'
import { Button, Descriptions } from 'antd';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../../_actions/user_actions';

function ProductInfo(props) {

    const dispatch = useDispatch();

    const clickHandler = () => {
      // 필요한 정보를 카트필드에 넣어준다.
        dispatch(addToCart(props.detail._id))
    }


    return (
        <div>
            <Descriptions title="Product Info" bordered>
                <Descriptions.Item label="Price" span={2}> ${props.detail.price}</Descriptions.Item>
                <Descriptions.Item label="Available Quantity" span= {2}>{props.detail.amount}</Descriptions.Item>
                <Descriptions.Item label="Description" span={3}> {props.detail.description}</Descriptions.Item>
                <Descriptions.Item label="flavor" span={3}> {props.detail.continents}</Descriptions.Item>
                <Descriptions.Item label="Nutrition Fact and Allergy Info">
                Calories per cake (45g): {props.detail.calories}kcal
                <br />
                Carbohydrate (Fiber, Sugar): {props.detail.carb}g ({props.detail.fiber}g,{props.detail.sugar}g)
                <br />
                Fat: {props.detail.fat}g
                <br />
                Protein: {props.detail.protein}g
                <br />
                Allergens: {props.detail.allergy}
                <br />
                </Descriptions.Item>
            </Descriptions>

            <br />
            <br />
            <br />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button size="large" shape="round" type="danger"
                    onClick={clickHandler}
                >
                    Add to Cart
                    </Button>
            </div>
        </div>
    )
}

export default ProductInfo
