import jwt from 'jsonwebtoken'

const verifyToken = (token: string) => new Promise<boolean>((res) => jwt.verify(token, process.env.SECRET || 'asjhd7h12d1', (err) => {
        if (!!err) return res(false)

        return res(true)
    })
)

export default verifyToken