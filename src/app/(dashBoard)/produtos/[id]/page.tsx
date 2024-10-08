interface IpropsParams {
  id: number;
}

const DetalhesProdutos = ({ params: { id } }: { params: IpropsParams }) => {
  return <h1>O id do parametro é {id}</h1>;
};

export default DetalhesProdutos;
