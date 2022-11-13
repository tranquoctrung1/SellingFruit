import { useOrderDetailGlobalState } from '../globalState/orderDetail.state';

import FormUpdateProductForOrderDetail from './formUpdateProductForOrderDetail';

const UpdateProductForOrderDetail = () => {
    const [listOrderDetail, setListOrderDetail] = useOrderDetailGlobalState(
        'listOrderDetail',
        [],
    );

    let listFormUpdate;

    if (listOrderDetail.length > 0) {
        listFormUpdate = listOrderDetail.map((item, key) => {
            return <FormUpdateProductForOrderDetail product={item} key={key} />;
        });
    }
    return <>{listFormUpdate}</>;
};

export default UpdateProductForOrderDetail;
