import { useParams } from 'react-router';

const UpdateProductPage = () => {
  const params = useParams();
  console.log(params.id);

  return <section>update Product</section>;
};

export default UpdateProductPage;
