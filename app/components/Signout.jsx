import { doSignOut } from '../actions';

const Signout = () => {
  return (
    <form action={doSignOut}>
      <button className="bg-orange-500 py-2 px-3 rounded-md">Signout</button>
    </form>
  );
};

export default Signout;
