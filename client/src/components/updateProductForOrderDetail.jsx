import { useOrderDetailGlobalState } from '../globalState/orderDetail.state';

import FormUpdateProductForOrderDetail from './formUpdateProductForOrderDetail';
const UpdateProductForOrderDetail = () => {
    const [listOrderDetail, setListOrderDetail] = useOrderDetailGlobalState(
        'listOrderDetail',
        [],
    );

    return (
        <>
            {listOrderDetail.map((item, key) => {
                return (
                    <FormUpdateProductForOrderDetail product={item} key={key} />
                );
            })}
        </>
    );
};

export default UpdateProductForOrderDetail;
