import { doSignIn } from '../actions';

const Signin = () => {
  return (
    <>
      {/* <Link href="/api/auth/signin">Signin</Link> */}
      <form action={doSignIn}>
        <button type="submit" className="bg-orange-500 py-2 px-3 rounded-md">
          Signin
        </button>
      </form>
    </>
  );
};

export default Signin;
