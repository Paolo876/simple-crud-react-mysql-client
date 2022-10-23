import { useState } from "react";
import axios from "axios";
import { useFriendsContext } from "./useFriendsContext";

/* PURPOSE:
 *  to do FriendsContext actions with the use of axios.
 *  uses useFriendsContext custom hook as well for updating user context.
 * PARAMETERS:
 *    -
 * RETURN VALUE:
 *    login, logout, signup, updateProfile
 * FUNCTION SIGNATURE:
 *    useAuthActions(string)
 */


export default function useFriendsActions() {
  const { dispatch } = useFriendsContext();
  const [ error, setError ] = useState(null);
  const [ isLoading, setIsLoading ] = useState(false);

  //friendRequestAction (confirm/cancel friend requests)

  //
  return {
    error,
    isLoading,
  }
}
