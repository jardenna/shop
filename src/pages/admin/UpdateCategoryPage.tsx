import { useParams } from 'react-router';

const UpdateCategoryPage = () => {
  const params = useParams();
  console.log(params.id);

  return <section>update category</section>;
};

export default UpdateCategoryPage;
