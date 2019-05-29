import React from 'react';
import {Link} from 'react-router-dom';
import CategoryList  from './CategoryList';
import CategoryNew from './CategoryNew';

const CategoryDashboard = () => {
    return (
        <div>
            <CategoryList />
            <CategoryNew />
        </div>
    );
}

export default CategoryDashboard;
