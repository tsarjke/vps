import React, { useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addVpsInfo } from '../../store/reducers/vpsSlice';
import { vpsApi } from '../../store/services/vpsServics';
import { useFetching } from '../../hooks/useFetching';
import OfferCard from '../OfferCard/OfferCard';

import cl from './OfferCardList.module.css';

const OfferCardList = () => {
  const dispatch = useDispatch();

  const [fetchVps] = vpsApi.useFetchVpsMutation();

  const [getVpsInfo, isVpsInfoLoading, VpsInfoError] = useFetching(async () => {
    const response = await fetchVps();
    dispatch(addVpsInfo(response.data.result));
  });

  useEffect(() => {
    getVpsInfo();
  }, []);

  const {
    vpsInfo: {
      vpsPlans, selectOs, selectPanel, osPanel, datacenters,
    },
    filter,
  } = useSelector((store) => store.vpsReducer);

  const filteredvpsPlans = useMemo(() => {
    if (vpsPlans) {
      if (filter.id === 0) {
        return vpsPlans;
      }
      return vpsPlans.filter((plan) => plan.category_id === filter.id);
    }
    return [];
  }, [vpsPlans, filter]);

  if (isVpsInfoLoading) {
    return <h2>Loading...</h2>;
  }

  if (VpsInfoError.length) {
    return <h2>{VpsInfoError}</h2>;
  }

  return (
    <div className={cl.container}>
      {filteredvpsPlans?.length ? (
        filteredvpsPlans.map((plan) => (
          <OfferCard
            key={plan.id}
            className={cl.listItem}
            data={{
              plan,
              selectOs,
              selectPanel,
              osPanel,
              datacenters,
            }}
          />
        ))
      ) : (
        <h2>Не найдено</h2>
      )}
    </div>
  );
};

export default OfferCardList;
