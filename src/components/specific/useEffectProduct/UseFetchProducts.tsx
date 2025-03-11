import { useState, useEffect, useContext } from 'react';
import { useAppDispatch, useAppSelector } from '~/redux/hooks';
import { message } from 'antd';
import { LoadingContext } from '~/context';
import { productActions } from '~/thunks/product/productSlice';
import { getErrorMessage } from '~/utils/constants/helper';
import { getColorProductThunk, getProductThunk, getSizeProductThunk } from '~/thunks/product/productThunk';
import { IProduct } from '~/utils/interfaces/interfaceProduct';
import { IParamsPagination, IPagination } from '~/utils/interfaces/common';
import { ICategory } from '~/utils/interfaces/interfaceCategory';
import { getCategoryThunk } from '~/thunks/category/categoryThunk';

const UseFetchProducts = (filters: IParamsPagination) => {
    const dispatch = useAppDispatch();
    const loadingContext = useContext(LoadingContext);

    const isRefreshTable = useAppSelector((state) => state.product.isRefreshSupplier);

    const [products, setProducts] = useState<IProduct[]>([]);
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [colors, setColors] = useState<string[]>([]);
    const [sizes, setSizes] = useState<string[]>([]);
    const [pagination, setPagination] = useState<IPagination>({ lengthPage: 0, currentPage: 1 });

    useEffect(() => {
        const fetchData = async () => {
            try {
                loadingContext?.show();
                const response = await dispatch(getProductThunk(filters)).unwrap();
                if (response) {
                    setProducts(response.data);
                    setPagination(response.pagination);
                }
            } catch (error) {
                message.error(getErrorMessage(error));
            } finally {
                loadingContext?.hide();
                dispatch(productActions.setRefreshTableFalse());
            }
        };
        fetchData();
    }, [JSON.stringify(filters), isRefreshTable]);

    useEffect(() => {
        dispatch(
            getCategoryThunk({
                currentPage: 1,
                limitPage: 10,
            })
        )
            .unwrap()
            .then((res) => setCategories(res.data))
            .catch((error) => message.error(getErrorMessage(error)));
    }, []);

    useEffect(() => {
        dispatch(getColorProductThunk())
            .unwrap()
            .then(setColors)
            .catch((error) => message.error(getErrorMessage(error)));
    }, []);

    useEffect(() => {
        dispatch(getSizeProductThunk())
            .unwrap()
            .then(setSizes)
            .catch((error) => message.error(getErrorMessage(error)));
    }, []);

    return { products, categories, colors, sizes, pagination };
};

export default UseFetchProducts;
