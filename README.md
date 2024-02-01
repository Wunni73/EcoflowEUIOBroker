![Logo](admin/zendure-solarflow.png)

# ioBroker.zendure-solarflow


## Zendure Solarflow adapter for ioBroker

This project is an ioBroker Adapter to read data from the Zendure Solarflow Cloud API. It uses the official API provided by Zendure.
You can read more about the API here: https://github.com/Zendure/developer-device-data-report

Notes:
1. You have to use the global Zendure Server! that Version is the Test for EU Server

2. It is possible to control the Output limit with the state created in the productId/deviceKey/control subfolder. Please deactivate/uncheck all modes in the Zendure App, otherwise it is not possible to set the output limit!

    ![Solarflow Setings Window](https://raw.github.com/nograx/ioBroker.zendure-solarflow/master/Screenshots/ZendureSolarflowSettings.png)

3. You will be logged out of the official iOS or Android App after logging in with the ioBroker adapter. This is a normal behavior. As a workaround you can create an second Zendure account with another e-mail and grant access to your Solarflow HUB to this account. Then use the second account for ioBroker / the Zendure Solarflow adapter.

## Credits

Credits goes to https://github.com/reinhard-brandstaedter/solarflow which helped a lot with the knowledge about the MQTT server from Zendure! Thanks!

## Donate

If you find the adapter useful for you and want to support my work, feel free to donate by Paypal. Thank You!
(this is an personal Donate link for Nograx, in no relation to the ioBroker Project!)<br />

[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/paypalme/PeterFrommert)

## Changelog
### 1.0.71 (2024-01-30)
- test the EU Server


## License

MIT License

Copyright (c) 2024 Peter Frommert

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
