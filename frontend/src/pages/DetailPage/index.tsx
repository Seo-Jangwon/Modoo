import useFetchDetail from '@/hooks/useFetchDetail';
import Flex from '@/layouts/Wrapper/Flex';
import { Navigate, useParams } from 'react-router-dom';
import DetailCardList from './DetailCardList/DetailCardList';
import DetailCover from './DetailCover/DetailCover';
import DetailList from './DetailList/DetailList';
import { s_container } from './style';

export type DetailVariants = 'album' | 'artist' | 'playlist';

interface DetailPageProps {
  variant: DetailVariants;
}

const DetailPage = ({ variant }: DetailPageProps) => {
  const { id } = useParams();
  const { isPending, isError, data } = useFetchDetail(variant, id!);
  if (isPending) return null;
  if (isError) return <Navigate to="/notfound" />;
  return (
    <Flex>
      <main css={s_container}>
        <DetailCover
          musicId={data?.listData[0].id}
          playListId={id!}
          variant={variant}
          title={data!.coverTitle}
          background={data!.image}
        />
        <DetailList title={data!.listTitle as string} data={data!.listData} totalDuration={data!.totalDuration} />
        {!!data?.cardListData?.length && (
          <DetailCardList variant={variant} title={data.cardListTitle} data={data.cardListData} />
        )}
      </main>
    </Flex>
  );
};

export default DetailPage;
