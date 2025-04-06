import { useParams } from 'react-router';

const UpdatePage = () => {
  const params = useParams();
  console.log(params.id);

  return <section>update</section>;
};

export default UpdatePage;
