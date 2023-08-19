import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from "./ingredient-item.module.css"
import {ingredientPropType} from '../../utils/prop-types'

export default function IngredientItem({ ingredient, count, onClick, onContextMenu }) { 
    function openModal(e) {
        e.preventDefault(); 
        onContextMenu(ingredient)
    }

    return (
        <li onContextMenu={(e)=>openModal(e)} onClick={()=>onClick(ingredient)} className={styles.ingredient}>
            {count && <Counter count={count} size="default" extraClass="m-1" />}
            <img className="ingredient__image" src={ingredient.image} alt={ingredient.name} />
            <div className={styles.price}>
                <p className="text text_type_digits-default mr-2">{ingredient.price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className={styles.name + " text text_type_main-small"}>{ingredient.name}</p>
        </li>)
}


IngredientItem.propTypes = {
    ingredient: ingredientPropType,
};




