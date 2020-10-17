import jwt from 'jsonwebtoken'

interface decodedToken {
    user: {
        id: string,
        admin: Boolean,
        storeName: string,
    }
}

const verifyToken = (token: string) => new Promise<decodedToken>((res) => jwt.verify(token, process.env.SECRET || 'asjhd7h12d1', (err, decoded) => {
        if (!!err) return res()

        return res(decoded as decodedToken)
    })
)

export default verifyToken