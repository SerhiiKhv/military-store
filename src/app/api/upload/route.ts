export async function POST(req: any){
    const data = await req.json()
   /* if(data.get('file')){
       const file = data.get('file')
    }*/

    return Response.json(data)
}