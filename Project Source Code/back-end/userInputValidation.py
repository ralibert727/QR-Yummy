
def PasswordPolicyCheck(Password):

    l, u, p, d = 0, 0, 0, 0
    s = Password
    if (len(s) >= 8):
        for i in s:

            # counting lowercase alphabets
            if (i.islower()):
                l+=1		

            # counting uppercase alphabets
            if (i.isupper()):
                u+=1		

            # counting digits
            if (i.isdigit()):
                d+=1		

            # counting the mentioned special characters
            if(i=='@'or i=='$' or i=='_'):
                p+=1		
    if (l>=1 and u>=1 and p>=1 and d>=1 and l+p+u+d==len(s)):
        return "Valid"
    else:
        return "Invalid"


def emailValidation (email):

    dot=0
    spclChar=0

    for s in email:

         if s == "@" or spclChar==1:
            spclChar=1

            if s == ".":
                dot=1

    if spclChar == 1 and dot == 1:

        return "Valid"

    else:
         return "Invalid"



def userValidation (event):

    try:

        if not event["CustomerName"].isnumeric():

            if event["PhNumber"].isnumeric() :

                emailValidationResponse = emailValidation (event["email"])

                if emailValidationResponse == "Valid":

                    if event["password"] == event ["ConfirmPassword"]:

                        PasswordResponse = PasswordPolicyCheck(event["password"])

                        if PasswordResponse == "Valid" :

                                return {
                                    "status": "success",
                                    "message": " All data received successfully"
                                }

                        else:
                            return {
                                "status": "error",
                                "message": "Password policy error"
                            }

                    else:
                        return {
                            "status": "error",
                            "message": "password mismatch"
                        }

                else:
                    return {
                        "status": "error",
                        "message": "email type policy error"
                    }

            else:
                return {
                    "status": "error",
                    "message": "Phone number type error"
                }
        else:
            return {
                "status": "error",
                "message": "Customer Name type error"
            }


    except Exception as e:
        return {
            "status": "error",
            "message": "Error in exception"
        }