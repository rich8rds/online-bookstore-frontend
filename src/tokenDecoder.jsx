import jwt_decode from "jwt-decode";
 

export const decodeJwt = (token) => {
    const decoded = jwt_decode(token);
    console.log(decoded); 
    
    /* prints:
    * { iss: "self",
    *   exp: 1393286893,
    *   iat: 1393268893  
    *   roles: "USER"
    *   sub: email
    * }
    */
    // decode header by passing in options (useful for when you need `kid` to verify a JWT):
    const decodedHeader = jwt_decode(token, { header: true });
    console.log(decodedHeader)

    return decoded

/* prints:
 * { typ: "JWT",
 *   alg: "HS256" }
 */
}

export const redirectToUserPage = (location, navigate, roles) => {
    let from = location.state?.from?.pathname || "/"

    if(roles === "USER")
        from = location.state?.from?.pathname || "/user/random"
    navigate(from, { replace: true })
}