export default async function sendRequest(url='',data={},reqMethod="POST"){

    let param = {
        method: reqMethod, // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
          'Content-Type': 'application/json'
        }
      };
      
      if (reqMethod == 'POST'){
        param.body = JSON.stringify(data);
      }

      console.log(url);
      console.log(param);
    const response = await fetch(url,param);
      return response;
}