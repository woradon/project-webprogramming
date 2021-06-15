import Document, {Html, Head, Main, NextScript} from 'next/document'

class MyDocument extends Document{
    render(){
        return(
            <Html lang="en">
                <Head>
                    <meta name="description" content="Dev AT Ecommerce website with Next.js"/>
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossOrigin="anonymous"></link>
                    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.bundle.min.js" integrity="sha384-JEW9xMcG8R+pH31jmWH6WWP0WintQrMb4s7ZOdauHnUtxwoG2vI5DkLtS3qm9Ekf" crossOrigin="anonymous"></script>
                    <script src="https://kit.fontawesome.com/a076d05399.js" crossOrigin="anonymous"></script>
                    <script src="https://www.paypal.com/sdk/js?client-id=Afwaa94UetYNvQ_IQgICe2Z3DjI5_SCAyDs7edn750kpSPIEW7bJ0W0yNeeev1wOuzLu4bTAgMDpGpe0"> </script>
                    <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
                    <link href="https://kit-pro.fontawesome.com/releases/v5.15.3/css/pro.min.css" rel="stylesheet"></link>
                    <link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" /> 
                    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
                    </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument