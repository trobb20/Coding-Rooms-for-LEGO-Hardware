/*
Project Name: SPIKE Prime Web Interface
File name: ServiceDock_SPIKE.js
Author: Jeremy Jung
Last update: 7/19/20
Description: HTML Element definition for <service-spike> to be used in ServiceDocks
Credits/inspirations:
History:
    Created by Jeremy on 7/16/20
LICENSE: MIT
(C) Tufts Center for Engineering Education and Outreach (CEEO)
*/

// import { Service_SPIKE } from "./Service_SPIKE.js";

class servicespike extends HTMLElement {   

    constructor () {
        super();

        var active = false; // whether the service was activated
        this.service = new Service_SPIKE(); // instantiate a service object ( one object per button )

        this.service.executeAfterDisconnect(function () {
            active = false;
            status.style.backgroundColor = "red";
        })

        // Create a shadow root
        var shadow = this.attachShadow({ mode: 'open' });

        /* wrapper definition and CSS */

        var wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'wrapper');
        wrapper.setAttribute("style", "width: 50px; height: 50px; position: relative; margin-top: 10px;")

        /* ServiceDock button definition and CSS */ 

        var button = document.createElement("button");
        button.setAttribute("id", "sl_button");
        button.setAttribute("class", "SD_button");

        var imageRelPath = "'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAMAAADDpiTIAAAAA3NCSVQICAjb4U/gAAAACXBIWXMAAA7rAAAO6wFxzYGVAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAkNQTFRF////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAYTIY8gAAAMB0Uk5TAAECAwQFBgcICQoLDA0ODxASExUWGBkaGxwdHh8gISIjJSYnKCkqKywuMDEzNTY4OTo7PD4/QkNERUZHSElLTE5PUFJTVFVXWFpbXF1eYGNkZWZnaGpsbnBxdHd4eXp7fn+AgYKDhYaIiYqPkJKTlJaYmZqbnJ2en6Cio6Slpqusra6wsbKztLa3ur2+v8DCw8TFxsjJysvOz9DS1NbY2tvc3d7g4eLj5ebn6Onq7O7v8PHy8/T19vf4+fr7/P3+LSmBjAAADX9JREFUeNrt3XtflHUax/FrPC0YGIeCNjQ3KkysXHbxUFIBkbmtBxYxNVfIw9qqgRkaupZ4CFGz3FRQ0BYthC2UlYwAOcz90PaPPKCD+Ltnhl7c1/X5PIPvNW8FZgZGhIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIAlVy9oJl63fU7p/A7avauHLJ3PTQb3WSUPrcJSs3Vu2byDep3bF+2YLs5BiHzt/W0uMFpsG22uLp4/3gTy+ubRsMzk16WrbNj/IfRmLh3k4vcPU1lGWO36OfWdbQF7ybdO4tTPQ9dU5drxfQwk0l4/PwlzSFg3qT3ro5vqZm7BnygtzZvPg//HlnA32SoT0ZzlOTtvR4Qe9wdnwf/uzDgT9Jz5Ykp6lTyjs9BQ3uSo/fw5++a1DDTTrLpzx6a+pXnpKuxe3rwB+vabnJV6mP2vr8ZU9N/Svi8/j/tV/PTS4/P/bW17o9TW2fFIdnfbapOkn3a2ONfW/I01V9UsxP/BxWdpKh9x7+7d/Hnrouzort8f/9BX03+fhh3woe9BTWkRHL4/9Em8abHBx97AeeyhoTon/8f3dG500+GG3sO2GdYx/m3aV/KT1J+J3Ira/0elqrjPbx/7vak/S+8uDWp39UO9YLvxXd418c1nuTH5++f+tjLZ7ienKjefxzezTfpOWx+8bWeKq7Ms3/4z/tiu6b1IwcmzOke6y3zj+AdcpPMpQzYmy98rFeV4rfxz+lS/tN6u+NzffUt90vgO36b5J/d+w5/WP7svw9/ll9+m9y7s7Ytz0DHfAH4ICFm7x9+zWgVgtjw75+FMwNW7hJ66+vCi3yTFTtB0C1jZssEhGRKhtj2/0AaLdxkyoREblqY6w3z/3xn2fkJFdFRHKNjPU2uwPYbOUmuSKyycrYZncAzVZusklELlgZ6810ffxnmjnJBZEsM2O9ta4A1tq5SZaU2Bl7gGeBIiqRNXbGnnQFcNLOTdbIVjtjL7oCuGjnJlu1vxVkZNddAVy3c5Ma/W8FuNfwFLfHf8qwnZvUS6OdsZ7j74hkGDpJo5kngj3P+cngeYZOclX6Da0tcANQYOgk/WJorFfs+PsAlm4CAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAmYEVuAIpMAbhpaOxCNwALDZ3kprQaWpvjBiDH0Ela5bShtaluAFINneS01NkZOxByAxAasHOTOqm2M7ZDHOuwc5NqqbQz9rwrgPN2blIpq+yMPeYK4Jidm6ySAjtjd7sC2G3nJgWS1G9m7FJXAEvNnKQ/SeS4lbG3kl0BJN+ycpPjIrLaytgT4twJKzdZLSIZYSNjy90BlBs5SThDRKTRyNhMdwCZRv5RNIqISIWNsU3ioyYbN6mw9NpHhR8ARv5R3H51rMHC1u40PwDSui3c5M4zYy8OGxi7QXy1wcBJhu6+PP6p/rHtCf4AJLTrv0nN3bVP9aofu1x8tlz9SXoy7q39UPvY5pBfAKFm7TfZMmLt413Kxy4W3y1WfpLOpJFry3SPPSJRdET3TVbcv/YTzVsvzYgGwIxLmm9S/cDaqaf0bu2aLVE1W/EXxpOTI94Ke1nr1oF8ibJ8te8O/U9K5NrnbigdWypRV6r0JP97drS1rw6qHLtTYminypMMLhp9bZnGp4SPTo4FwOSjCk8y/LeH/lbkz/r+/cf0+ItM1vd/wM9j/I7s3DZl3/+VSsyVKvtOsG3uWGuf+EbVz3/5EofyVf00+M0TY6+dtl/R8z+zJS7NVvSM0P5pj5z7vpZfFDgyQ+LUDC3PCve/7zJ31uca3hLZvFji2GINrw2GP5/lOPelwD8v3L48JHEttDzw7xA59ZKPvW8E+ste94YEiXsJGwL9PsFLb/j8+ffdo78E9D+6cxVpMi6lVTQF9Itj7xfvRvF8SMKbNT8Ebml96ZMyjmWWnwjc7w1ery2aHvVXvpc3f/blt4F4lajv+zOHPipMlHEveenuY+c7AvHs0M+X/33on3+eFIcvf8/kFRZP4IoWvpAiv22h1JyFRRP5JoV/+sNjQkRERERERERERERERERERERERERERERERERERERERERERERERERa48/ERZbywgT/M3F5z8Th7+XyhyIjSyz86NCZ7/uCcJMb33752eaXo/6z2fyp2MieLK0P3Cet/1DzZhT/F/DHoiNLqzgX0D8W/ctRv38smj8XH/kfoqE/F88HRkR+N2ToAyP4yJjILH1kDB8aFZGlD43iY+Mis/SxcXxwZGSWPjiSj46NzNJHx/Lh0ZHPh1j68Gg+Pj7y8Vf58fFlo499ddDT2M5YAOxUeZLBV0fb+twNT2cxfB9QqvQkN56L3Jp6WelYbyDqnwXyB7Te5HLqg1unnvLU1hXl8wGzu/Te5NTUB8Z+4inuUlTPCc64pPkmnzzwA4CnuiPRADii+yb3/SjweJfusV4UrwwtVn6SrsdHjP1Q+Viv2ferw6Fm7Tf58N7Yp3q1j/WW+wWwXP1Jep+6O/ZT9WO9dp/vEUpo13+TT++MfXFY/1hvgz8AGwycZPjF22MbDIz1un29UzSt28JNGn4dm+OZqMIPgAobN8mxNLbJD4AmS/8oGm2MDWe6P/6ZYRs3aRQRyTAy1it3B1Bu5CThDBFZbWSsd8IdwAkrN1ktIsetjL2V7Pr4J9+ycpPjIkn9VsZ6S10BLDVzkv4kKTAz1tvtCmC3nZsUyCo7Y4+5Ajhm5yarpNLO2POuAM7buUmlVNsZ2+EKoMPOTaqlzs7YAcc3BYQG7NykTk7bGeulugFINXSS09JqaG2OG4AcQydplZuG1i50A7DQ0EluiqGxXpEbgCJLNzEFoNgNQDEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJiAAPoNjS1wA1Bg6CT9ctXQ2nluAOYZOslVaTS0NsMNQIahkzRKvZ2xw1PcAEwZtnOTeqmxM/a6OHbdzk1qZKudsRddAVy0c5OtssbO2JOuAE7auckaKbEz9oArgAN2blIiWXbGrnUFsNbOTbJELpgZO9MVwEwzJ7kgIpusjG0W55qt3GSTiORaGbvZHcBmKzfJFREzTwbPcwdg5cngqyIiUmVjbLv4qN3GTapERGSRjbHVfgBU27jJol+f+m61sDWc6wdAbtjCTVpvvzjytoWxB8RXJp4LKrmz9pz+rX1Z/gBk9em/yZm7a/P1j90uPtuu/yZ599aqf1NAV4pfACld2m9yeMTanCHlY9eJ79YpP8nAsyPXKn9byJVp/gFMu2LhOYA7JbVo3tqTK1GU26P5JucTH/iut1PxUwBvSVS9pfjJgP9mPrh2vt6feyolyirVnqT35ci1f9E69qBE3UGtN3lntLX/0Lm1MSF6AAlKf2ti66hrQ4c0bu3IkBjK6NB4k7rQ6Gun7tW39eIsialZCt8ivnfqQ+eu1/Y7MfVJEmNJ2p4lHV4/1tzXf1I1dvskiblJul4V+On1sefmfKdna/8KiUsrFP0K/Xc5j1qb9rWWrdfyJE7lXdNyk6/THH43tlzFk4KDu9IlbqXvGtRwk85yt9+PTtoS/GfBD2dLXMs+HPiT9Gxx/444Y0+wXx8+mydxL+9soE8ytMffEyJz6nqDOjXcVCLjUklTYF8d6q2b43tuYuHeAH4z0NdQlinjVmZZQwBfM+vcW5gY3d7Q/G0tAfp2YLCttni6jHPTi2vbAvQdYU/Ltvmh2BYnZy9Ytn5H7f4J3L6qjSuXzE0PyW9UKH3ukpUbq/ZN5JvU7li/bEF2shARERERERERERERERERERERERERERERERERERERERERERERERERUaD6PwNVgF3R9uWvAAAAAElFTkSuQmCC'" // relative to the document in which a servicespike is created ( NOT this file )
        var length = 50; // for width and height of button
        var buttonBackgroundColor = "#A2E1EF" // background color of the button
        var buttonStyle = "width:" + length + "px; height:" + length + "px; background: url(" + imageRelPath + ") no-repeat; background-size: 40px 40px; background-color:" + buttonBackgroundColor
            + "; border: none; background-position: center; cursor: pointer; border-radius: 10px; position: relative; margin: 4px 0px; "
        button.setAttribute("style", buttonStyle);

        /* status circle definition and CSS */

        var status = document.createElement("div");
        status.setAttribute("class", "status");
        var length = 20; // for width and height of circle
        var statusBackgroundColor = "red" // default background color of service (inactive color)
        var posLeft = 30;
        var posTop = 20;
        var statusStyle = "border-radius: 50%; height:" + length + "px; width:" + length + "px; background-color:" + statusBackgroundColor +
            "; position: relative; left:" + posLeft + "px; top:" + posTop + "px;";
        status.setAttribute("style", statusStyle);

        /* event listeners */
        
        button.addEventListener("mouseleave", function (event) {
            button.style.backgroundColor = "#A2E1EF";
            button.style.color = "#000000";
        });

        button.addEventListener("mouseenter", function (event) {
            button.style.backgroundColor = "#FFFFFF";
            button.style.color = "#000000";
        })

        // when ServiceDock button is double clicked
        this.addEventListener("click", async function () {
            if ("serial" in navigator) {
                // check active flag so once activated, the service doesnt reinit
                if (!active) {
                    console.log("activating service");
                    var initSuccessful = await this.service.init();
                    if (initSuccessful) {
                        active = true;
                        status.style.backgroundColor = "green";
                    }
                }
            }
            else {
                alert("To use this function you need to enable Experimental Web Interfaces on Google Chrome. Please go to chrome://flags/#enable-experimental-web-platform-features Enable the flag and restart Google Chrome.")
            }
            
        });


        shadow.appendChild(wrapper);
        button.appendChild(status);
        wrapper.appendChild(button);

    }

    /* get the Service_SPIKE object */
    getService() {
        return this.service;
    }

    /* get whether the ServiceDock button was clicked */
    getClicked() {
        return this.active;
    }

}

// when defining custom element, the name must have at least one - dash 
window.customElements.define('service-spike', servicespike);

/*
Project Name: SPIKE Prime Web Interface
File name: Service_SPIKE.js
Author: Jeremy Jung
Last update: 7/22/20
Description: SPIKE Service Library (OOP)
Credits/inspirations:
    Based on code wrriten by Ethan Danahy, Chris Rogers
History:
    Created by Jeremy on 7/15/20
LICENSE: MIT
(C) Tufts Center for Engineering Education and Outreach (CEEO)
*/


/**
 * @class Service_SPIKE 
 * @example
 * // if you're using ServiceDock
 * var mySPIKE = document.getElemenyById("service_spike").getService();
 * // if you're not using ServiceDock
 * var mySPIKE = new Service_SPIKE();
 * 
 * mySPIKE.init();
 */
function Service_SPIKE() {

    //////////////////////////////////////////
    //                                      //
    //          Global Variables            //
    //                                      //
    //////////////////////////////////////////

    /* private members */

    const VENDOR_ID = 0x0694; // LEGO SPIKE Prime Hub

    // common characters to send (for REPL/uPython on the Hub)
    const CONTROL_C = '\x03'; // CTRL-C character (ETX character)
    const CONTROL_D = '\x04'; // CTRL-D character (EOT character)
    const RETURN = '\x0D';	// RETURN key (enter, new line)

    /* using this filter in webserial setup will only take serial ports*/
    const filter = {
        usbVendorId: VENDOR_ID
    };

    // define for communication
    let port;
    let reader;
    let writer;
    let value;
    let done;
    let writableStreamClosed;

    //define for json concatenation
    let jsonline = "";

    // contains latest full json object from SPIKE readings
    let lastUJSONRPC;

    // object containing real-time info on devices connected to each port of SPIKE Prime 
    let ports =
    {
        "A": { "device": "none", "data": {} },
        "B": { "device": "none", "data": {} },
        "C": { "device": "none", "data": {} },
        "D": { "device": "none", "data": {} },
        "E": { "device": "none", "data": {} },
        "F": { "device": "none", "data": {} }
    };

    // object containing real-time info on hub sensor values
    /*
        !say the usb wire is the nose of the spike prime

        ( looks at which side of the hub is facing up)
        gyro[0] - up/down detector ( down: 1000, up: -1000, neutral: 0)
        gyro[1] - rightside/leftside detector ( leftside : 1000 , rightside: -1000, neutal: 0 )
        gyro[2] - front/back detector ( front: 1000, back: -1000, neutral: 0 )

        ( assume the usb wire port is the nose of the spike prime )
        accel[0] - roll acceleration (roll to right: -, roll to left: +)
        accel[1] - pitch acceleration (up: +, down: -)
        accel[2] - yaw acceleration (counterclockwise: +. clockwise: -)

        ()
        pos[0] - yaw angle
        pos[1] - pitch angle
        pos[2] - roll angle

    */
    let hub = 
    {
        "gyro": [0,0,0],
        "accel": [0,0,0],
        "pos": [0,0,0]
    }

    let batteryAmount = 0; // battery [0-100]

    // string containing real-time info on hub events
    let hubFrontEvent;
    
    /*
        up: hub is upright/standing, with the display looking horizontally
        down: hub is upsidedown with the display, with the display looking horizontally
        front: hub's display facing towards the sky
        back: hub's display facing towards the earth
        leftside: hub rotated so that the side to the left of the display is facing the earth
        rightside: hub rotated so that the side to the right of the display is facing the earth
    */
    let lastHubOrientation; //PrimeHub orientation read from caught UJSONRPC 

    /*
        shake
        freefall
    */
    let hubGesture;

    // 
    let hubMainButton = {"pressed": false, "duration": 0};
    
    let hubBluetoothButton = { "pressed": false, "duration": 0 };
    
    let hubLeftButton = { "pressed": false, "duration": 0 };
    
    let hubRightButton = { "pressed": false, "duration": 0 };
    
    /* PrimeHub data storage arrays for was_***() functions */
    let hubGestures = []; // array of hubGestures run since program started or since was_gesture() ran
    let hubButtonPresses = [];

    /* SPIKE Prime Projects */
    
    let hubProjects = { "0": "None", 
                    "1": "None", 
                    "2": "None",
                    "3": "None",
                    "4": "None",
                    "5": "None",
                    "6": "None",
                    "7": "None",
                    "8": "None",
                    "9": "None",
                    "10": "None",
                    "11": "None",
                    "12": "None",
                    "13": "None",
                    "14": "None",
                    "15": "None",
                    "16": "None",
                    "17": "None",
                    "18": "None",
                    "19": "None"
                };

    // true after Force Sensor is pressed, turned to false after reading it for the first time that it is released
    let ForceSensorWasPressed = false;
    
    var micropython_interpreter = false; // whether micropython was reached or not

    let serviceActive = false; //serviceActive flag

    var waitForNewOriFirst = true; //whether the wait_for_new_orientation method would be the first time called

    /* stored callback functions from wait_until functions and etc. */

    var funcAtInit = undefined; // function to call after init of SPIKE Service

    var funcAfterPrint = undefined; // function to call for SPIKE python program print statements or errors
    var funcAfterError = undefined; // function to call for errors in ServiceDock

    var funcAfterDisconnect = undefined; // function to call after SPIKE Prime is disconnected

    var funcAfterNewGesture = undefined;
    var funcAfterNewOrientation = undefined;

    var funcAfterLeftButtonPress = undefined;
    var funcAfterLeftButtonRelease = undefined;
    var funcAfterRightButtonPress = undefined;
    var funcAfterRightButtonRelease = undefined;

    var funcUntilColor = undefined;
    var funcAfterNewColor = undefined;

    var funcAfterForceSensorPress = undefined;
    var funcAfterForceSensorRelease = undefined;

    /* array that holds the pointers to callback functions to be executed after a UJSONRPC response */
    var responseCallbacks = [];

    // array of information needed for writing program
    var startWriteProgramCallback = undefined; // [message_id, function to execute ]
    var writePackageInformation = undefined; // [ message_id, remaining_data, transfer_id, blocksize]
    var writeProgramCallback = undefined; // callback function to run after a program was successfully written

    //////////////////////////////////////////
    //                                      //
    //          Public Functions            //
    //                                      //
    //////////////////////////////////////////

    /** <h4> initialize SPIKE_service </h4>
     * <p> Makes prompt in Google Chrome ( Google Chrome Browser needs "Experimental Web Interface" enabled) </p>
     * <p> Starts streaming UJSONRPC </p>
     * <p> <em> this function needs to be executed after executeAfterInit but before all other public functions </em> </p>
     * @public
     * @returns {boolean} True if service was successsfully initialized, false otherwise
     */
    async function init() {

        console.log("navigator.product is ", navigator.product);
        console.log("navigator.appName is ", navigator.appName);
        // reinit variables in the case of hardware disconnection and Service reactivation
        reader = undefined;
        writer = undefined;

        // initialize web serial connection
        var webSerialConnected = await initWebSerial();

        if (webSerialConnected) {

            // start streaming UJSONRPC
            streamUJSONRPC();
            serviceActive = true;

            await sleep(2000); // wait for service to init
            
            // call funcAtInit if defined
            if ( funcAtInit !== undefined ) {
                funcAtInit();
            }
            return true;
        }
        else {
            return false;
        }
    }

    /** <h4> Get the callback function to execute after service is initialized. </h4>
     * <p> <em> This function needs to be executed before calling init() </em> </p>
     * @public
     * @param {function} callback Function to execute after initialization ( during init() )
     * @example
     * mySPIKE.executeAfterInit( function () {
     *     var portsInfo = await mySPIKE.getPortsInfo();
     * })
     */
    function executeAfterInit(callback) {
        // Assigns global variable funcAtInit a pointer to callback function
        funcAtInit = callback;
    }

    /** <h4> Get the callback function to execute after a print or error from SPIKE python program </h4>
     * @public
     * @param {function} callback 
     */
    function executeAfterPrint(callback) {
        funcAfterPrint = callback;
    }

    /** <h4> Get the callback function to execute after Service Dock encounters an error </h4>
     * 
     * @public 
     * @param {any} callback 
     */
    function executeAfterError(callback) {
        funcAfterError = callback;
    }

    /** <h4> Get the callback function to execute after service is disconnected </h4>
     * 
     * @public
     * @param {any} callback 
     */
    function executeAfterDisconnect(callback) {
        funcAfterDisconnect = callback;
    }

    /** <h4> Send command to the SPIKE Prime (UJSON RPC or Micropy depending on current interpreter) </h4>
     * <p> May make the SPIKE Prime do something </p>
     * @public 
     * @param {string} command Command to send (or sequence of commands, separated by new lines)
     */
    async function sendDATA(command) {
        // look up the command to send
        commands = command.split("\n"); // split on new line
        //commands = command
        console.log("sendDATA: " + commands);

        // make sure ready to write to device
        setupWriter();

        // send it in micropy if micropy reached
        if (micropython_interpreter) {
            
            for (var i = 0; i < commands.length; i++) {
                // console.log("commands.length", commands.length)

                // trim trailing, leading whitespaces
                var current = commands[i].trim();

                writer.write(current);
                writer.write(RETURN); // extra return at the end
            }
        }
        // expect json scripts if micropy not reached
        else {
            // go through each line of the command
            // trim it, send it, and send a return...
            for (var i = 0; i < commands.length; i++) {
                
                //console.log("commands.length", commands.length)
                
                current = commands[i].trim();
                //console.log("current", current);
                // turn string into JSON

                //string_current = (JSON.stringify(current));
                //myobj = JSON.parse(string_current);
                var myobj = await JSON.parse(current);

                // turn JSON back into string and write it out
                writer.write(JSON.stringify(myobj));
                writer.write(RETURN); // extra return at the end
            }
        }
    }


    /** <h4> Send character sequences to reboot SPIKE Prime </h4>
     * <p> <em> Run this function to exit micropython interpreter </em> </p>
     * @public
     * @example
     * mySPIKE.rebootHub();
     */
    async function rebootHub() {
        console.log("rebooting")
        // make sure ready to write to device
        setupWriter();
        writer.write(CONTROL_C);
        writer.write(CONTROL_D);

        //toggle micropython_interpreter flag if its was active
        if (micropython_interpreter) {
            micropython_interpreter = false;
        }
    }

    /** <h4> Get the information of all the ports and devices connected to them </h4>
     * @public
     * @returns {object} <p> An object with keys as port letters and values as objects of device type and info </p>
     * @example
     * // USAGE 
     * 
     * var portsInfo = await mySPIKE.getPortsInfo();
     * // ports.{yourPortLetter}.device --returns--> device type (ex. "smallMotor" or "ultrasonic") </p>
     * // ports.{yourPortLetter}.data --returns--> device info (ex. {"speed": 0, "angle":0, "uAngle": 0, "power":0} ) </p>
     * 
     * // Motor on port A
     * var motorSpeed = portsInfo["A"]["speed"]; // motor speed
     * var motorDegreesCounted = portsInfo["A"]["angle"]; // motor angle
     * var motorPosition = portsInfo["A"]["uAngle"]; // motor angle in unit circle ( -180 ~ 180 )
     * var motorPower = portsInfo["A"]["power"]; // motor power
     * 
     * // Ultrasonic Sensor on port A
     * var distance = portsInfo["A"]["distance"] // distance value from ultrasonic sensor
     * 
     * // Color Sensor on port A
     * var reflectedLight = portsInfo["A"]["reflected"]; // reflected light
     * var ambientLight = portsInfo["A"]["ambient"]; // ambient light
     * var RGB = portsInfo["A"]["RGB"]; // [R, G, B]
     * 
     * // Force Sensor on port A
     * var forceNewtons = portsInfo["A"]["force"]; // Force in Newtons ( 1 ~ 10 ) 
     * var pressedBool = portsInfo["A"]["pressed"] // whether pressed or not ( true or false )
     * var forceSensitive = portsInfo["A"]["forceSensitive"] // More sensitive force output( 0 ~ 900 )
     */
    async function getPortsInfo() {
        return ports;
    }

    /** <h4> get the info of a single port </h4>
     * @public
     * @param {string} letter Port on the SPIKE hub
     * @returns {object} Keys as device and info as value
     */
    async function getPortInfo(letter) {
        return ports[letter];
    }

    /** <h4> Get battery status </h4>
     * 
     * @public
     * @returns {integer} battery percentage
     */
    async function getBatteryStatus() {
        return batteryAmount;
    }

    /** <h4> Get info of the hub </h4>
     * @public
     * @returns {object} Info of the hub
     * @example
     * var hubInfo = await mySPIKE.getHubInfo();
     * 
     * var upDownDetector = hubInfo["gyro"][0];
     * var rightSideLeftSideDetector = hubInfo["gyro"][1];
     * var frontBackDetector = hubInfo["gyro"][2];
     * 
     * var rollAcceleration = hubInfo["pos"][0];  
     * var pitchAcceleration = hubInfo["pos"][1]; 
     * var yawAcceleration = hubInfo["pos"][2];   
     * 
     * var yawAngle = hubInfo["pos"][0];
     * var pitchAngle = hubInfo["pos"][1];
     * var rollAngle = hubInfo["pos"][2];
     * 
     * 
     */
    async function getHubInfo() {
        return hub;
    }


    /** <h4> get projects in all the slots of SPIKE Prime hub </h4>
     * 
     * @public
     * @returns {object}
     */
    async function getProjects() {
        
        UJSONRPC.getStorageStatus();

        await sleep(2000);

        return hubProjects
    }

    /** <h4> Reach the micropython interpreter beneath UJSON RPC </h4>
     * <p> Note: Stops UJSON RPC stream </p>
     * <p> hub needs to be rebooted to return to UJSONRPC stream</p>
     * @public
     * @example
     * mySPIKE.reachMicroPy();
     * mySPIKE.sendDATA("from spike import PrimeHub");
     * mySPIKE.sendDATA("hub = PrimeHub()");
     * mySPIKE.sendDATA("hub.light_matrix.show_image('HAPPY')");
     */
    async function reachMicroPy() {
        console.log("starting micropy interpreter");
        setupWriter();
        writer.write(CONTROL_C);
        micropython_interpreter = true;
    }

    /** <h4> Get the latest complete line of UJSON RPC from stream </h4>
     * @public
     * @returns {string} Represents a JSON object from UJSON RPC
     */
    async function getLatestUJSON() {

        try {
            var parsedUJSON = await JSON.parse(lastUJSONRPC)
        }
        catch (error) {
            //console.log('[retrieveData] ERROR', error);
        }

        return lastUJSONRPC
    }

    /** Get whether the Service was initialized or not
     * @public
     * @returns {boolean} True if service initialized, false otherwise
     */
    function isActive() {
        return serviceActive;
    }

    /** <h4> Get the most recently detected orientation of the hub </h4>
     * @public
     * @returns {string} ['up','down','front','back','leftside','rightside']
     */
    async function getHubOrientation() {
        return lastHubOrientation;
    }

    /** <h4> Get the most recently detected event on the display of the hub </h4>
     * @public
     * @returns {string} ['tapped','doubletapped']
     */
    async function getHubFrontEvent() {
        return hubFrontEvent;
    }

    /** <h4> Get the most recently detected gesture of the hub </h4>
     * @public
     * @returns {string} ['shake', 'freefall']
     */
    async function getHubGesture() {
        return hubGesture;
    }

    /** <h4> Get the latest press event information on the "connect" button </h4>
     * @public
     * @returns {object} { "pressed": BOOLEAN, "duration": NUMBER } 
     * @example
     * var bluetoothButtonInfo = await mySPIKE.getBluetoothButton();
     * var pressedBool = bluetoothButtonInfo["pressed"];
     * var pressedDuration = bluetoothButtonInfo["duration"]; // duration is miliseconds the button was pressed until release
     */
    async function getBluetoothButton() {
        return hubBluetoothButton;
    }

    /** <h4> Get the latest press event information on the "center" button </h4>
     * @public
     * @returns {object} { "pressed": BOOLEAN, "duration": NUMBER }
     * @example
     * var mainButtonInfo = await mySPIKE.getMainButton();
     * var pressedBool = mainButtonInfo["pressed"];
     * var pressedDuration = mainButtonInfo["duration"]; // duration is miliseconds the button was pressed until release
     * 
     */
    async function getMainButton() {
        return hubMainButton;
    }

    /** <h4> Get the latest press event information on the "left" button </h4>
     * @public
     * @returns {object} { "pressed": BOOLEAN, "duration": NUMBER } 
     * @example
     * var leftButtonInfo = await mySPIKE.getLeftButton();
     * var pressedBool = leftButtonInfo["pressed"];
     * var pressedDuration = leftButtonInfo["duration"]; // duration is miliseconds the button was pressed until release
     * 
     */
    async function getLeftButton() {
        return hubLeftButton;
    }

    /** <h4> Get the latest press event information on the "right" button </h4>
     * @public
     * @returns {object} { "pressed": BOOLEAN, "duration": NUMBER } 
     * @example
     * var rightButtonInfo = await mySPIKE.getRightButton();
     * var pressedBool = rightButtonInfo["pressed"];
     * var pressedDuration = rightButtonInfo["duration"]; // duration is miliseconds the button was pressed until release
     */
    async function getRightButton() {
        return hubRightButton;
    }

    /** <h4> Get the ports connected to any kind of Motors </h4>
     * @public
     * @returns {(string|Array)} Ports that are connected to Motors
     */
    async function getMotorPorts() {

        var portsInfo = ports;
        var motorPorts = [];
        for (var key in portsInfo) {
            if (portsInfo[key].device == "smallMotor" || portsInfo[key].device == "bigMotor") {
                motorPorts.push(key);
            }
        }
        return motorPorts;

    }

    /** <h4> Get the ports connected to Small Motors </h4>
     * @public
     * @returns {(string|Array)} Ports that are connected to Small Motors
     */
    async function getSmallMotorPorts() {
        
        var portsInfo = ports;
        var motorPorts = [];
        for (var key in portsInfo) {
            if (portsInfo[key].device == "smallMotor" ) {
                motorPorts.push(key);
            }
        }
        return motorPorts;

    }

    /** <h4> Get the ports connected to Big Motors </h4>
     * @public
     * @returns {(string|Array)} Ports that are connected to Big Motors
     */
    async function getBigMotorPorts() {
        var portsInfo = ports;
        var motorPorts = [];
        for (var key in portsInfo) {
            if (portsInfo[key].device == "bigMotor") {
                motorPorts.push(key);
            }
        }
        return motorPorts;
    }

    /** <h4> Get the ports connected to Distance Sensors </h4>
     * @public
     * @returns {(string|Array)} Ports that are connected to Distance Sensors
     */
    async function getUltrasonicPorts() {

        var portsInfo = await this.getPortsInfo();
        var ultrasonicPorts = [];

        for (var key in portsInfo) {
            if (portsInfo[key].device == "ultrasonic") {
                ultrasonicPorts.push(key);
            }
        }

        return ultrasonicPorts;

    }

    /** <h4> Get the ports connected to Color Sensors </h4>
     * @public
     * @returns {(string|Array)} Ports that are connected to Color Sensors
     */
    async function getColorPorts() {

        var portsInfo = await this.getPortsInfo();
        var colorPorts = [];

        for (var key in portsInfo) {
            if (portsInfo[key].device == "color") {
                colorPorts.push(key);
            }
        }

        return colorPorts;

    }

    /** <h4> Get the ports connected to Force Sensors </h4>
     * @public
     * @returns {(string|Array)} Ports that are connected to Force Sensors
     */
    async function getForcePorts() {

        var portsInfo = await this.getPortsInfo();
        var forcePorts = [];

        for (var key in portsInfo) {
            if (portsInfo[key].device == "force") {
                forcePorts.push(key);
            }
        }

        return forcePorts;

    }

    /** <h4> Terminate currently running micropy program</h4>
     * @public
     */
    function stopCurrentProgram() {
        UJSONRPC.programTerminate();
    }

    /** <h4> write a micropy program into a slot of the SPIKE Prime </h4>
     * 
     * @public
     * @param {string} projectName name of the project to register
     * @param {string} data the micropy code to send (expecting an <input type="text">.value)
     * @param {integer} slotid slot number to assign the program in [0-9]
     * @param {function} callback callback to run after program is written
     */
    async function writeProgram(projectName, data, slotid, callback) {

        // template of python file that needs to be concatenated
        var firstPart = "from runtime import VirtualMachine\n\n# Stack for execution:\nasync def stack_1(vm, stack):\n"
        var secondPart = "# Setup for execution:\ndef setup(rpc, system, stop):\n\n    # Initialize VM:\n    vm = VirtualMachine(rpc, system, stop, \"Target__1\")\n\n    # Register stack on VM:\n    vm.register_on_start(\"stack_1\", stack_1)\n\n    return vm"

        // stringify data and strip trailing and leading quotation marks
        var stringifiedData = JSON.stringify(data);
        stringifiedData = stringifiedData.substring(1, stringifiedData.length - 1);

        var result = ""; // string to which the final code will be appended

        var splitData = stringifiedData.split(/\\n/); // split the code by every newline

        // add a tab before every newline (this is syntactically needed for concatenating with the template)
        for (var index in splitData) {

            var addedTab = "    " + splitData[index] + "\n";

            result = result + addedTab;
        }

        stringifiedData = firstPart + result + secondPart;

        writeProgramCallback = callback;

        // begin the write program process
        UJSONRPC.startWriteProgram(projectName, "python", stringifiedData, slotid);

    }

    /** <h4> Execute a program in a slot </h4>
     * 
     * @public
     * @param {integer} slotid slot of program to execute [0-9]
     */
    function executeProgram(slotid) {
        UJSONRPC.programExecute(slotid)
    }

    //////////////////////////////////////////
    //                                      //
    //         SPIKE APP Functions          //
    //                                      //
    //////////////////////////////////////////

    /** PrimeHub object
    * @class
    * @memberof Service_SPIKE
    * @returns {classes} 
    * <p> left_button </p>
    * <p> right_button </p>
    * <p> motion_sensor </p>
    * <p> light_matrix </p>
    */
    PrimeHub = function() {
        var newOrigin = 0;
        
        /** PrimeHub.left_button
        * @class
        * @returns {functions} - functions from PrimeHub.left_button
        */
        var left_button = {};

        /** execute callback after this button is pressed
        * @param {function} callback
        */
        left_button.wait_until_pressed = function wait_until_pressed (callback) {
            funcAfterLeftButtonPress = callback;
        }
        /** execute callback after this button is released
         *
         * @param {function} callback
         */
        left_button.wait_until_released = function wait_until_released (callback) {
            funcAfterLeftButtonRelease = callback;
        }
        /** Tests to see whether the button has been pressed since the last time this method called.
         *
         * @returns {boolean} - True if was pressed, false otherwise
         */
        left_button.was_pressed = function was_pressed () {
            if ( hubLeftButton.duration > 0 ) {
                hubLeftButton.duration = 0;
                return true;
            } else {
                return false;
            }
        }
        
        /** Tests to see whether the button is pressed
        *
        * @returns {boolean} True if pressed, false otherwise
        */
        left_button.is_pressed = function is_pressed() {
            if (hubLeftButton.pressed) {
                return true;
            }
            else {
                return false;
            }
        }
        
        /** PrimeHub.right_button
         * @class
         * @returns {functions} functions from PrimeHub.right_button
         */
        var right_button = {};

        /** execute callback after this button is pressed
        *
        * @param {function} callback
        * @example
        * var hub = new mySPIKE.PrimeHub();
        * var right_button = hub.right_button;
        * right_button.wait_until_pressed ( function () {
        *     console.log("right_button was pressed");
        * })
        */
        right_button.wait_until_pressed = function wait_until_pressed(callback) {

            funcAfterRightButtonPress = callback;
        }

        /** execute callback after this button is released
         * 
         * @param {function} callback 
         * @example
         * var hub = new mySPIKE.PrimeHub();
         * var right_button = hub.right_button;
         * right_button.wait_until_released ( function () {
         *     console.log("right_button was released");
         * })
         */
        right_button.wait_until_released = function wait_until_released(callback) {

            functAfterRightButtonRelease = callback;
        }

        /** Tests to see whether the button has been pressed since the last time this method called.
         * 
         * @returns {boolean} - True if was pressed, false otherwise
         * @example
         * var hub = new mySPIKE.PrimeHub();
         * if ( hub.right_button.was_pressed() ) {
         *     console.log("right_button was pressed");
         * }
         */
        right_button.was_pressed = function was_pressed() {
            if (hubRightButton.duration > 0) {
                hubRightButton.duration = 0;
                return true;
            } else {
                return false;
            }
        }

        /** Tests to see whether the button is pressed
         * 
         * @returns {boolean} True if pressed, false otherwise
         */
        right_button.is_pressed = function is_pressed() {
            if ( hubRightButton.pressed ) {
                return true;
            }
            else {
                return false;
            }
        }

        /** PrimeHub.Light Matrix
         * @class
         * @returns {functions} - functions from PrimeHub.light_matrix
         */
        var light_matrix = {};

        /**
         * @todo Implement this function
         * @param {string}
         */
        light_matrix.show_image = function show_image(image) {

        }
        /** Sets the brightness of one pixel (one of the 25 LED) on the Light Matrix.
         * 
         * @param {integer} x [0 to 4]
         * @param {integer} y [0 to 4]
         * @param {integer} brightness [0 to 100]
         */
        light_matrix.set_pixel = function set_pixel (x, y, brightness = 100) {
            UJSONRPC.displaySetPixel(x,y,brightness);
            
        }
        /** Writes text on the Light Matrix, one letter at a time, scrolling from right to left.
         * 
         * @param {string} message 
         */
        light_matrix.write = function write (message) {
            UJSONRPC.displayText(message);
        }
        /** Turns off all the pixels on the Light Matrix.
         * 
         */
        light_matrix.off = function off () {
            UJSONRPC.displayClear();
        }

        /** speaker
         * @class
         * @returns {functions} functions from Primehub.speaker
         */
        var speaker = {};

        speaker.volume = 100;

        /** Plays a beep on the Hub.
         * 
         * @param {integer} note The MIDI note number [44 to 123 (60 is middle C note)]
         * @param {number} seconds The duration of the beep in seconds
         */
        speaker.beep = function beep (note, seconds) {
            UJSONRPC.soundBeep(speaker.volume, note);
            setTimeout(function() { UJSONRPC.soundStop() }, seconds * 1000);
        }

        /** Starts playing a beep.
         * 
         * @param {integer} note The MIDI note number [44 to 123 (60 is middle C note)]
         */
        speaker.start_beep = function start_beep (note) {
            UJSONRPC.soundBeep(speaker.volume, note)
        }

        /** Stops any sound that is playing.
         * 
         */
        speaker.stop = function stop() {
            UJSONRPC.soundStop();
        }

        /** Retrieves the value of the speaker volume.
         * @returns {number} The current volume [0 to 100]
         */
        speaker.get_volume = function get_volume() {
            return speaker.volume;
        }

        /** Sets the speaker volume.
         * 
         * @param {integer} newVolume 
         */
        speaker.set_volume = function set_volume(newVolume) {
            speaker.volume = newVolume
        }

        /** Motion Sensor
         * @class
         * @returns {functions} functions from PrimeHub.motion_sensor
         */
        var motion_sensor = {};

        /** Sees whether a gesture has occurred since the last time was_gesture() 
         * was used or since the beginning of the program (for the first use).
         * 
         * @param  {string} gesture
         * @returns {boolean} true if the gesture was made, false otherwise
         */
        motion_sensor.was_gesture = function was_gesture (gesture) {
            
            var gestureWasMade = false;
            
            // iterate over the hubGestures array
            for ( index in hubGestures ) {
                
                // pick a gesture from the array
                var oneGesture = hubGestures[index];
                
                // switch the flag that gesture existed
                if ( oneGesture == gesture ) {
                    gestureWasMade = true;
                    break;
                }
            }   
            // reinitialize hubGestures so it only holds gestures that occurred after this was_gesture() execution
            hubGestures = [];

            return gestureWasMade;

        }

        /** Executes callback when a new gesture happens
         * 
         * @param  {function(string)} callback - A callback whose signature is name of the gesture
         */
        motion_sensor.wait_for_new_gesture = function wait_for_new_gesture(callback) {

            funcAfterNewGesture = callback;

        }

        /** Executes callback when the orientation of the Hub changes or when function was first called
         * 
         * @param  {function(string)} callback - A callback whose signature is name of the orientation
         */
        motion_sensor.wait_for_new_orientation = function wait_for_new_orientation(callback) {
            // immediately return current orientation if the method was called for the first time
            if (waitForNewOriFirst) {
                waitForNewOriFirst = false;
                callback(lastHubOrientation);
            } 
            // for future executions, wait until new orientation
            else {
                funcAfterNewOrientation = callback;                
            }
            
        }

        /** “Yaw” is the rotation around the front-back (vertical) axis.
         * 
         * @returns {integer} yaw angle
         */
        motion_sensor.get_yaw_angle = function get_yaw_angle() {
            var currPos = hub.pos[0];

            return currPos;
        }

        /** “Pitch” the is rotation around the left-right (transverse) axis.
         * 
         * @returns {integer} pitch angle
         */
        motion_sensor.get_pitch_angle = function get_pitch_angle() {
            return hub.pos[1];
        }

        /** “Roll” the is rotation around the front-back (longitudinal) axis.
         * 
         * @returns {integer} roll angle
         */
        motion_sensor.get_roll_angle = function get_roll_angle() {
            return hub.pos[2];
        }

        /** Retrieves the most recently detected gesture.
         * 
         * @returns {string} the name of gesture
         */
        motion_sensor.get_gesture = function get_gesture() {
            return hubGesture;
        }

        /** Retrieves the most recently detected orientation
         * Note: Hub does not detect orientation of when it was connected
         * 
         * @returns {string} the name of orientation
         */
        motion_sensor.get_orientation = function get_orientation() {
            return lastHubOrientation;
        }

        return {
            motion_sensor: motion_sensor,
            light_matrix: light_matrix,
            left_button: left_button,
            right_button: right_button,
            speaker: speaker
        }
    }

    /** Motor
     * @class
     * @param {string} Port
     * @memberof Service_SPIKE
     * @returns {functions}
     */
    Motor = function (port) {
        
        var motor = ports[port]; // get the motor info by port

        // default settings
        var defaultSpeed = 100;
        var stopMethod = false; // stop method doesnt seem to work in this current ujsonrpc config
        var stallSetting = true;

        // check if device is a motor
        if ( motor.device != "smallMotor" && motor.device != "bigMotor" ) {
            throw new Error("No motor detected at port " + port);
        }

        /** Get current speed of the motor
         *  
         * @returns {number} speed of motor [-100 to 100]
         */
        function get_speed() {
            var motor = ports[port]; // get the motor info by port
            var motorInfo = motor.data;
            return motorInfo.speed;
            
        }

        /** Get current position of the motor
         * 
         * @returns {number} position of motor [0 to 359]
         */
        function get_position() {
            var motor = ports[port]; // get the motor info by port
            var motorInfo = motor.data;
            return motorInfo.angle;
        }

        /** Get current degrees counted of the motor
         * 
         * @returns {number} counted degrees of the motor [any number]
         */
        function get_degrees_counted() {
            var motor = ports[port]; // get the motor info by port
            var motorInfo = motor.data;
            return motorInfo.uAngle;
        }

        /** Get the power of the motor
         * 
         * @returns {number} motor power
         */
        function get_power() {
            var motor = ports[port]; // get the motor info by port
            var motorInfo = motor.data;
            return motorInfo.power;
        }

        /** Get the default speed of this motor
         * 
         * @returns {number} motor default speed [-100 to 100]
         */
        function get_default_speed() {
            return defaultSpeed;
        }

        /** Set the default speed for this motor
         * 
         * @param {number} speed [-100 to 100]
         */
        function set_default_speed(speed) {
            if ( typeof speed == "number" ) {
                defaultSpeed = speed;
            }
        }

        /** Turns stall detection on or off.
         * Stall detection senses when a motor has been blocked and can’t move.
         * If stall detection has been enabled and a motor is blocked, the motor will be powered off
         * after two seconds and the current motor command will be interrupted. If stall detection has been
         * disabled, the motor will keep trying to run and programs will “get stuck” until the motor is no
         * longer blocked.
         * @param {boolean} boolean - true if to detect stall, false otherwise
         */
        function set_stall_detection(boolean) {
            if (typeof boolean == "boolean") {
                stallSetting = boolean;
            }
        }

        /** Runs the motor to an absolute position.
         * 
         * @param {integer} degrees [0 to 359]
         * @param {integer} speed [-100 to 100]
         * @param {function} [callback==undefined] Parameters:"stalled" or "done"
         */
        function run_to_position (degrees, speed, callback = undefined) {
            if ( speed !== undefined && typeof speed == "number" ) {
                UJSONRPC.motorGoRelPos (port, degrees, speed, stallSetting, stopMethod, callback);
            }
            else {
                UJSONRPC.motorGoRelPos(port, degrees, defaultSpeed, stallSetting, stopMethod, callback);
            }
        }

        /** Start the motor at some power
         * 
         * @param {integer} power [-100 to 100]
         */
        function start_at_power (power) {
            UJSONRPC.motorPwm (port, power, stallSetting);
        }


        /** Start the motor at some speed
         * 
         * @param {integer} speed [-100 to 100]
         */
        function start (speed = defaultSpeed) {
            // if (speed !== undefined && typeof speed == "number") {
                // UJSONRPC.motorStart (port, speed, stallSetting);
            // }
            // else {
                // UJSONRPC.motorStart(port, defaultSpeed, stallSetting);
            // }

            UJSONRPC.motorStart(port, speed, stallSetting);
        }

        /** Run the motor for some seconds
         * 
         * @param {integer} seconds 
         * @param {integer} speed [-100 to 100]
         * @param {function} [callback==undefined] Parameters:"stalled" or "done"
         */
        function run_for_seconds (seconds, speed, callback = undefined) {
            if (speed !== undefined && typeof speed == "number") {
                UJSONRPC.motorRunTimed (port, seconds, speed, stallSetting, stopMethod, callback)
            }
            else {
                UJSONRPC.motorRunTimed(port, seconds, defaultSpeed, stallSetting, stopMethod, callback)
            }
        }

        /** Run the motor for some degrees
         * 
         * @param {integer} degrees 
         * @param {integer} speed [-100 to 100]
         * @param {function} [callback==undefined] Parameters:"stalled" or "done"
         */
        function run_for_degrees (degrees, speed, callback = undefined) {
            if (speed !== undefined && typeof speed == "number") {
                UJSONRPC.motorRunDegrees (port, degrees, speed, stallSetting, stopMethod, callback);
            }
            else {
                UJSONRPC.motorRunDegrees(port, degrees, defaultSpeed, stallSetting, stopMethod, callback);
            }
        }

        /** Stop the motor
         * 
         */
        function stop () {
            UJSONRPC.motorPwm (port, 0, stallSetting);
        }

        return {
            run_to_position: run_to_position,
            start_at_power: start_at_power,
            start: start,
            stop: stop,
            run_for_degrees: run_for_degrees,
            run_for_seconds: run_for_seconds,
            set_default_speed: set_default_speed,
            set_stall_detection: set_stall_detection,
            get_power: get_power,
            get_degrees_counted: get_degrees_counted,
            get_position: get_position,
            get_speed: get_speed,
            get_default_speed: get_default_speed
        }
    }

    /** ColorSensor
     * @class
     * @param {string} Port
     * @memberof Service_SPIKE
     * @returns {functions}
     */
    ColorSensor = function(port) {
        var waitForNewColorFirst = false;

        var colorsensor = ports[port]; // get the color sensor info by port
        var colorsensorData = colorsensor.data;

        // check if device is a color sensor
        if (colorsensor.device != "color") {
            throw new Error("No Color Sensor detected at port " + port);
        }

        /** Get the name of the detected color
         * 
         * @returns {string} 'black','violet','blue','cyan','green','yellow','red','white',None
         */
        function get_color() {
            var colorsensor = ports[port]; // get the color sensor info by port
            var colorsensorData = colorsensor.data;

            var r = colorsensorData.Cr;
            var g = colorsensorData.Cg;
            var b = colorsensorData.Cb;

            var hex = rgbToHex(r,g,b);
            var match = ntc(hex);
            // name of the color 
            return match[1]
        }

        /** Retrieves the intensity of the ambient light.
         * 
         * @returns {number} The ambient light intensity. [0 to 100]
         */
        function get_ambient_light() {
            var colorsensor = ports[port]; // get the color sensor info by port
            var colorsensorData = colorsensor.data;

            return colorsensorData.Cambient;
        }

        /** Retrieves the intensity of the reflected light.
         * 
         * @returns {number} The reflected light intensity. [0 to 100]
         */
        function get_reflected_light() {
            var colorsensor = ports[port]; // get the color sensor info by port
            var colorsensorData = colorsensor.data;

            return colorsensorData.Creflected;
        }

        /** Retrieves the red, green, blue, and overall color intensity.
         * @todo Implement overall intensity
         * @returns {(number|Array)} Red, green, blue, and overall intensity (0-1024)
         */
        function get_rgb_intensity() {
            var colorsensor = ports[port]; // get the color sensor info by port
            var colorsensorData = colorsensor.data;

            var toReturn = [];
            toReturn.push(colorsensorData.Cr);
            toReturn.push(colorsensorData.Cg);
            toReturn.push(colorsensorData.Cb)
            toReturn.push("TODO: unimplemented");;
        }

        /** Retrieves the red color intensity.
         * 
        * @returns {number} [0 to 1024]
         */
        function get_red() {
            var colorsensor = ports[port]; // get the color sensor info by port
            var colorsensorData = colorsensor.data;

            return colorsensorData.RGB[0];
        }

        /** Retrieves the green color intensity.
         * 
         * @returns {number} [0 to 1024]
         */
        function get_green() {
            var colorsensor = ports[port]; // get the color sensor info by port
            var colorsensorData = colorsensor.data;

            return colorsensorData.RGB[1];
        }

        /** Retrieves the blue color intensity.
         * 
         * @returns {number} [0 to 1024]
         */
        function get_blue() {
            var colorsensor = ports[port]; // get the color sensor info by port
            var colorsensorData = colorsensor.data;

            return colorsensorData.RGB[2];
        }


        /** Waits until the Color Sensor detects the specified color.
         * @todo Implement this function
         */
        function wait_until_color (color) {
            var color = get_color();

        }


        /** Execute callback when Color Sensor detects a new color.
         * The first time this method is called, it returns immediately the detected color. 
         * After that, it waits until the Color Sensor detects a color that is different from the color that
         * was detected the last time this method was used.
         * @todo Implement this function
         * @param {function(string)} callback  
         */
        function wait_for_new_color(callback) {
            
            // check if this method has been executed after start of program
            if (waitForNewColorFirst) {
                waitForNewColorFirst = true;

                var currentColor = get_color();
                callback(currentColor)    
            }
            funcAfterNewColor = callback;
        }

        // https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
        function componentToHex(c) {
            var hex = c.toString(16);
            return hex.length == 1 ? "0" + hex : hex;
        }

        function rgbToHex(r, g, b) {
            return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
        }


        return {
            get_color: get_color,
            get_ambient_light: get_ambient_light,
            get_reflected_light: get_reflected_light,
            get_rgb_intensity: get_rgb_intensity,
            get_red: get_red,
            get_green: get_green,
            get_blue: get_blue
        }

    }

    /** DistanceSensor
     * @class
     * @param {string} Port
     * @memberof Service_SPIKE
     * @returns {functions}
     */
    DistanceSensor = function (port) {

        var distanceSensor = ports[port] // get the distance sensor info by port
        var distanceSensorData = distanceSensor.data;

        // check if device is a distance sensor
        if (distanceSensor.device != "ultrasonic") {
            throw new Error("No Distance Sensor detected at port " + port);
        }

        /** Retrieves the measured distance in centimeters.
         * @param {boolean} short_range Whether to use or not the short range mode.
         * @returns {number} [0 to 200]
         * @todo find the short_range handling ujsonrpc script
         */
        function get_distance_cm (short_range) {
            var distanceSensor = ports[port] // get the distance sensor info by port
            var distanceSensorData = distanceSensor.data;

            return distanceSensorData.distance;
        }

        /** Retrieves the measured distance in inches.
         * 
         * @param {boolean} short_range Whether to use or not the short range mode.
         * @returns {number} [0 to 79]
         * @todo find the short_range handling ujsonrpc script
         */
        function get_distance_inches (short_range) {
            var distanceSensor = ports[port] // get the distance sensor info by port
            var distanceSensorData = distanceSensor.data;

            var inches = distanceSensorData.distance * 0.393701;
            return inches;
        }

        /** Retrieves the measured distance in percent.
         * 
         * @param {boolean} short_range Whether to use or not the short range mode.
         * @returns {number/string} [0 to 100] or 'none' if can't read distance
         * @todo find the short_range handling ujsonrpc script
         */
        function get_distance_percentage(short_range) {
            var distanceSensor = ports[port] // get the distance sensor info by port
            var distanceSensorData = distanceSensor.data;

            if ( distanceSensorData.distance == null ) {
                return "none"
            }
            var percentage = distanceSensorData.distance/200;
            return percentage;
        }

        /** Waits until the measured distance is greater than distance.
         * 
         * @param {integer} distance 
         * @param {string} unit 'cm','in','%'
         * @param {integer} short_range 
         * @todo Implement this function
         */
        function wait_for_distance_farther_than ( distance, unit, short_range ) {

        }

        /** xWaits until the measured distance is less than distance.
         * 
         * @param {any} distance 
         * @param {any} unit 'cm','in','%'
         * @param {any} short_range 
         * @todo Implement this function
         */
        function wait_for_distance_closer_than ( distance, unit, short_range ) {

        }

        return {
            get_distance_cm: get_distance_cm,
            get_distance_inches: get_distance_inches,
            get_distance_percentage: get_distance_percentage
        }

    }

    /** ForceSensor
     * @class
     * @param {string} Port
     * @memberof Service_SPIKE
     * @returns {functions}
     */
    ForceSensor = function (port) {
        
        var sensor = ports[port]; // get the force sensor info by port

        if (sensor.device != "force") {
            throw new Error("No Force Sensor detected at port " + port);
        }
        
        /** Tests whether the button on the sensor is pressed.
         * 
         * @returns {boolean} true if force sensor is pressed, false otherwise
         */
        function is_pressed() {
            var sensor = ports[port]; // get the force sensor info by port
            var ForceSensorData = sensor.data;

            return ForceSensorData.pressed;
        }

        /** Retrieves the measured force, in newtons.
         * 
         * @returns {number}  Force in newtons [0 to 10]
         */
        function get_force_newton() {
            var sensor = ports[port]; // get the force sensor info by port
            var ForceSensorData = sensor.data;

            return ForceSensorData.force;
        }
        
        /** Retrieves the measured force as a percentage of the maximum force.
         * 
         * @returns {number} percentage [0 to 100]
         */
        function get_force_percentage() {
            var sensor = ports[port]; // get the force sensor info by port
            var ForceSensorData = sensor.data;

            var denominator = 704 - 384 // highest detected - lowest detected forceSensitive values
            var numerator = ForceSensorData.forceSensitive - 384 // 384 is the forceSensitive value when not pressed
            var percentage = Math.round((numerator / denominator) * 100);
            return percentage;
        }

        /** Executes callback when Force Sensor is pressed
         * The function is executed in updateHubPortsInfo()'s Force Sensor part
         * 
         * @param {function} callback 
         */
        function wait_until_pressed(callback) {
            funcAfterForceSensorPress = callback;
        }

        /** Executes callback when Force Sensor is released
         * The function is executed in updateHubPortsInfo()'s Force Sensor part
         * @param {function} callback 
         */
        function wait_until_released(callback) {
            funcAfterForceSensorRelease = callback;
        }

        return {
            is_pressed: is_pressed,
            get_force_newton: get_force_newton,
            get_force_percentage: get_force_percentage,
            wait_until_pressed: wait_until_pressed,
            wait_until_released: wait_until_released
        }
    
    }

    /** MotorPair
     * @class
     * @param {string} leftPort
     * @param {string} rightPort
     * @memberof Service_SPIKE
     * @returns {functions}
     * @todo implement the rest (what is differential (tank) steering? )
     */
    MotorPair = function(leftPort, rightPort) {
        // settings 
        var defaultSpeed = 100;

        var leftMotor = ports[leftPort];
        var rightMotor = ports[rightPort];

        var DistanceTravelToRevolutionRatio = 17.6;
        
        // check if device is a motor
        if (leftMotor.device != "smallMotor" && leftMotor.device != "bigMotor") {
            throw new Error("No motor detected at port " + port);
        }
        if (rightMotor.device != "smallMotor" && rightMotor.device != "bigMotor") {
            throw new Error("No motor detected at port " + port);
        }

        /** Sets the ratio of one motor rotation to the distance traveled.
         * 
         * If there are no gears used between the motors and the wheels of the Driving Base, 
         * then amount is the circumference of one wheel.
         * 
         * Calling this method does not affect the Driving Base if it is already currently running. 
         * It will only have an effect the next time one of the move or start methods is used.
         * 
         * @param {number} amount 
         * @param {string} unit 'cm','in'
         */
        function set_motor_rotation (amount, unit) {
            
            // assume unit is 'cm' when undefined
            if (unit == "cm" || unit !== undefined) {
                DistanceTravelToRevolutionRatio = amount;
            }
            else if (unit == "in") {
                // convert to cm
                DistanceTravelToRevolutionRatio = amount * 2.54;
            }
        }

        /** Starts moving the Driving Base
         * 
         * @param {integer} left_speed [-100 to 100]
         * @param {integer} right_speed [-100 to 100]
         */
        function start_tank (left_speed, right_speed) {
            UJSONRPC.moveTankSpeeds(left_speed, right_speed, leftPort, rightPort);
        }

        // /** Starts moving the Driving Base without speed control.
        //  * 
        //  * @param {any} power 
        //  * @param {any} steering 
        //  * @todo Implement this function
        //  */
        // function start_at_power (power, steering) {

        // }

        /** Starts moving the Driving Base
         * 
         * @param {integer} leftPower 
         * @param {integer} rightPower  
         */
        function start_tank_at_power (leftPower, rightPower) {
            UJSONRPC.moveTankPowers(leftPower, rightPower, leftPort, rightPort);
        }

        /** Stops the 2 motors simultaneously, which will stop a Driving Base.
         * 
         */
        function stop() {
            UJSONRPC.moveTankPowers(0, 0, leftPort, rightPort);
        }

        return {
            stop: stop,
            set_motor_rotation: set_motor_rotation,
            start_tank: start_tank,
            start_tank_at_power: start_tank_at_power
        }

    }

    //////////////////////////////////////////
    //                                      //
    //          UJSONRPC Functions          //
    //                                      //
    //////////////////////////////////////////

    /** Low Level UJSONRPC Commands
     * @namespace UJSONRPC
     */
    var UJSONRPC = {};

    /**
     * 
     * @memberof! UJSONRPC
     * @param {string} text 
     */
    UJSONRPC.displayText = async function displayText(text) {
        var randomId = generateId();
        var command = '{"i":' + '"' + randomId + '"' + ', "m": "scratch.display_text", "p": {"text":' + '"' + text + '"' + '} }'
        sendDATA(command);
    }

    /**
     * @memberof! UJSONRPC
     * @param {integer} x [0 to 4]
     * @param {integer} y [0 to 4]
     * @param {integer} brightness [1 to 100]
     */
    UJSONRPC.displaySetPixel = async function displaySetPixel(x, y, brightness) {
        var randomId = generateId();
        var command = '{"i":' + '"' + randomId + '"' + ', "m": "scratch.display_set_pixel", "p": {"x":' + x +
            ', "y":' + y + ', "brightness":' + brightness + '} }';
        sendDATA(command);
    }

    /**
     * @memberof! UJSONRPC
     */
    UJSONRPC.displayClear = async function displayClear() {
        var randomId = generateId();
        var command = '{"i":' + '"' + randomId + '"' + ', "m": "scratch.display_clear" }';
        sendDATA(command);
    }

    /**
     * @memberof! UJSONRPC
     * @param {string} port 
     * @param {integer} speed 
     * @param {integer} stall 
     */
    UJSONRPC.motorStart = async function motorStart(port, speed, stall) {
        var randomId = generateId();
        var command = '{"i":' + '"' + randomId + '"' + ', "m": "scratch.motor_start", "p": {"port":'
            + '"' + port + '"' +
            ', "speed":' + speed +
            ', "stall":' + stall +
            '} }';
        sendDATA(command);
    }

    /** moves motor to a position
     * 
     * @memberof! UJSONRPC
     * @param {string} port 
     * @param {integer} position 
     * @param {integer} speed 
     * @param {boolean} stall 
     * @param {boolean} stop 
     * @param {function} callback
     */
    UJSONRPC.motorGoRelPos = async function motorGoRelPos(port, position, speed, stall, stop, callback) {
        var randomId = generateId();
        var command = '{"i":' + '"' + randomId + '"' +
            ', "m": "scratch.motor_go_to_relative_position"' +
            ', "p": {' +
            '"port":' + '"' + port + '"' +
            ', "position":' + position +
            ', "speed":' + speed +
            ', "stall":' + stall +
            ', "stop":' + stop +
            '} }';
        typeof callback !== undefined && pushResponseCallback(randomId, callback);
        sendDATA(command);
    }

    /**
     * 
     * @memberof! UJSONRPC
     * @param {string} port 
     * @param {integer} time 
     * @param {integer} speed 
     * @param {integer} stall 
     * @param {boolean} stop
     * @param {function} callback
     */
    UJSONRPC.motorRunTimed = async function motorRunTimed(port, time, speed, stall, stop, callback) {
        var randomId = generateId();
        var command = '{"i":' + '"' + randomId + '"' +
            ', "m": "scratch.motor_run_timed"' +
            ', "p": {' +
            '"port":' + '"' + port + '"' +
            ', "time":' + time +
            ', "speed":' + speed +
            ', "stall":' + stall +
            ', "stop":' + stop +
            '} }';
        typeof callback !== undefined && pushResponseCallback(randomId, callback);
        sendDATA(command);
    }

    /**
     * 
     * @memberof! UJSONRPC
     * @param {string} port 
     * @param {integer} degrees 
     * @param {integer} speed 
     * @param {integer} stall 
     * @param {boolean} stop
     * @param {function} callback
     */
    UJSONRPC.motorRunDegrees = async function motorRunDegrees(port, degrees, speed, stall, stop, callback) {
        var randomId = generateId();
        var command = '{"i":' + '"' + randomId + '"' +
            ', "m": "scratch.motor_run_for_degrees"' +
            ', "p": {' +
            '"port":' + '"' + port + '"' +
            ', "degrees":' + degrees +
            ', "speed":' + speed +
            ', "stall":' + stall +
            ', "stop":' + stop +
            '} }';
        typeof callback !== undefined && pushResponseCallback(randomId, callback);
        sendDATA(command);
    }

    /**
     * @memberof! UJSONRPC
     * @param {integer} time 
     * @param {integer} lspeed 
     * @param {integer} rspeed 
     * @param {string} lmotor 
     * @param {string} rmotor 
     * @param {boolean} stop
     * @param {function} callback
     */
    UJSONRPC.moveTankTime = async function moveTankTime(time, lspeed, rspeed, lmotor, rmotor, stop, callback) {
        var randomId = generateId();
        var command = '{"i":' + '"' + randomId + '"' +
            ', "m": "scratch.move_tank_time"' +
            ', "p": {' +
            '"time":' + time +
            ', "lspeed":' + lspeed +
            ', "rspeed":' + rspeed +
            ', "lmotor":' + '"' + lmotor + '"' +
            ', "rmotor":' + '"' + rmotor + '"' +
            ', "stop":' + stop +
            '} }';
        typeof callback !== undefined && pushResponseCallback(randomId, callback);
        sendDATA(command);
    }

    /**
     * 
     * @memberof! UJSONRPC
     * @param {integer} degrees 
     * @param {integer} lspeed 
     * @param {integer} rspeed 
     * @param {string} lmotor 
     * @param {string} rmotor 
     * @param {boolean} stop
     * @param {function} callback
     */
    UJSONRPC.moveTankDegrees = async function moveTankDegrees(degrees, lspeed, rspeed, lmotor, rmotor, stop, callback) {
        var randomId = generateId();
        var command = '{"i":' + '"' + randomId + '"' +
            ', "m": "scratch.move_tank_degrees"' +
            ', "p": {' +
            '"degrees":' + degrees +
            ', "lspeed":' + lspeed +
            ', "rspeed":' + rspeed +
            ', "lmotor":' + '"' + lmotor + '"' +
            ', "rmotor":' + '"' + rmotor + '"' +
            ', "stop":' + stop +
            '} }';
        typeof callback !== undefined && pushResponseCallback(randomId, callback);
        sendDATA(command);
    }

    /**
     * 
     * @memberof! UJSONRPC
     * @param {integer} lspeed 
     * @param {integer} rspeed 
     * @param {string} lmotor 
     * @param {string} rmotor 
     * @param {function} callback
     */
    UJSONRPC.moveTankSpeeds = async function moveTankSpeeds(lspeed, rspeed, lmotor, rmotor, callback) {
        var randomId = generateId();
        var command = '{"i":' + '"' + randomId + '"' +
            ', "m": "scratch.move_start_speeds"' +
            ', "p": {' +
            '"lspeed":' + lspeed +
            ', "rspeed":' + rspeed +
            ', "lmotor":' + '"' + lmotor + '"' +
            ', "rmotor":' + '"' + rmotor + '"' +
            '} }';
        typeof callback !== undefined && pushResponseCallback(randomId, callback);
        sendDATA(command);
    }

    /**
     * 
     * @memberof! UJSONRPC
     * @param {integer} lpower 
     * @param {integer} rpower 
     * @param {string} lmotor 
     * @param {string} rmotor 
     * @param {function} callback
     */
    UJSONRPC.moveTankPowers = async function moveTankPowers(lpower, rpower, lmotor, rmotor, callback) {
        var randomId = generateId();
        var command = '{"i":' + '"' + randomId + '"' +
            ', "m": "scratch.move_start_powers"' +
            ', "p": {' +
            '"lpower":' + lpower +
            ', "rpower":' + rpower +
            ', "lmotor":' + '"' + lmotor + '"' +
            ', "rmotor":' + '"' + rmotor + '"' +
            '} }';
        typeof callback !== undefined && pushResponseCallback(randomId, callback);
        sendDATA(command);
    }

    /**
     * 
     * @memberof! UJSONRPC
     * @param {integer} volume 
     * @param {integer} note 
     */
    UJSONRPC.soundBeep = async function soundBeep(volume, note) {
        var randomId = generateId();
        var command = '{"i":' + '"' + randomId + '"' +
            ', "m": "scratch.sound_beep"' +
            ', "p": {' +
            '"volume":' + volume +
            ', "note":' + note +
            '} }';
        sendDATA(command);
    }

    /**
     * @memberof! UJSONRPC
     */
    UJSONRPC.soundStop = async function soundStop() {
        var randomId = generateId();
        var command = '{"i":' + '"' + randomId + '"' +
            ', "m": "scratch.sound_off"' +
            '}';
        sendDATA(command);
    }

    /**
     * 
     * @memberof! UJSONRPC
     * @param {string} port 
     * @param {integer} power 
     * @param {integer} stall 
     */
    UJSONRPC.motorPwm = async function motorPwm(port, power, stall) {
        var randomId = generateId();
        var command = '{"i":' + '"' + randomId + '"' + ', "m": "scratch.motor_pwm", "p": {"port":' + '"' + port + '"' +
            ', "power":' + power + ', "stall":' + stall + '} }';
        sendDATA(command);
    }

    /**
     * 
     * @memberof! UJSONRPC
     */
    UJSONRPC.getFirmwareInfo = async function getFirmwareInfo() {
        var randomId = generateId();
        var command = '{"i":' + '"' + randomId + '"' + ', "m": "get_firmware_info" ' + '}';
        sendDATA(command);
    }

    /** 
     * 
     * 
     * @param {integer} slotid 
     */
    UJSONRPC.programExecute= async function programExecute(slotid) {
        var randomId = generateId();
        var command = '{"i":' + '"' + randomId + '"' + ', "m": "program_execute", "p": {"slotid":' + slotid + '} }';
        sendDATA(command);
    }

    /** 
     * 
     * 
     */
    UJSONRPC.programTerminate = function programTerminate() {

        var randomId = generateId();
        var command = '{"i":' + '"' + randomId + '"' +
            ', "m": "program_terminate"' +
            '}';

        sendDATA(command);
    }

    /**
     * 
     * @param {string} projectName name of the project
     * @param {integer} type type of data (micropy or scratch)
     * @param {string} data entire data to send in ASCII
     * @param {integer} slotid slot to which to assign the program
     */
    UJSONRPC.startWriteProgram = async function startWriteProgram(projectName, type, data, slotid) {

        console.log("in startWriteProgram...");
        console.log("constructing start_write_program script...");

        if (type == "python") {
            var typeInt = 0;
        }

        // construct the UJSONRPC packet to start writing program

        var dataSize = (new TextEncoder().encode(data)).length;
        
        var randomId = generateId();

        var command = '{"i":' + '"' + randomId + '"' +
            ', "m": "start_write_program", "p": {' +
            '"meta": {' +
            '"created": ' + parseInt(Date.now() * 1000) +
            ', "modified": ' + parseInt(Date.now() * 1000) +
            ', "name": ' + '"' + projectName + '"' +
            ', "type": ' + typeInt +
            ', "project_id":' + Math.floor(Math.random() * 1000) +
            '}' +
            ', "fname": ' + '"' + projectName + '"' +
            ', "size": ' + dataSize +
            ', "slotid": ' + slotid +
            '} }';

        console.log("constructed start_write_program script...");
        
        // assign function to start sending packets after confirming blocksize and transferid
        startWriteProgramCallback = [randomId, writePackageFunc];

        console.log("sending start_write_program script");

        sendDATA(command);

        // function to write the first packet of data
        function writePackageFunc(blocksize, transferid) {

            console.log("in writePackageFunc...");
            
            console.log("stringified the entire data to send: ", data);
            
            // when data's length is less than the blocksize limit of sending data
            if ( data.length <= blocksize ) {
                console.log("data's length is less than the blocksize of ", blocksize);

                // if the data's length is not zero (not empty)
                if ( data.length != 0 ) {

                    var dataToSend = data.substring(0, data.length); // get the entirety of data

                    console.log("data's length is not zero, sending the entire data: ", dataToSend);

                    var base64data = btoa(dataToSend); // encode the packet to base64
                    
                    UJSONRPC.writePackage(base64data, transferid); // send the packet

                    // writeProgram's callback defined by the user
                    if (writeProgramCallback != undefined) {
                        writeProgramCallback();
                    }

                }
                // the package to send is empty, so throw error
                else {
                    throw new Error("package to send is initially empty");
                }

            }
            // if the length of data to send is larger than the blocksize, send only a blocksize amount
            // and save the remaining data to send packet by packet
            else if ( data.length > blocksize ) {

                console.log("data's length is more than the blocksize of ", blocksize);

                var dataToSend = data.substring(0, blocksize); // get the first block of packet

                console.log("sending the blocksize amount of data: ", dataToSend);

                var base64data = btoa(dataToSend); // encode the packet to base64

                var msgID = UJSONRPC.writePackage(base64data, transferid); // send the packet

                var remainingData = data.substring(blocksize, data.length); // remove the portion just sent from data

                console.log("reassigning writePackageInformation with message ID: ", msgID);
                console.log("reassigning writePackageInformation with remainingData: ", remainingData);

                // update package information to be used for sending remaining packets
                writePackageInformation = [msgID, remainingData, transferid, blocksize];

            }

        }        

    }



    /**
     * 
     * @param {string} base64data base64 encoded data to send
     * @param {string} transferid transferid of this program write process
     * @returns {string} the randomly generated message id used to send this UJSONRPC script
     */
    UJSONRPC.writePackage = function writePackage(base64data, transferid) {

        var randomId = generateId();
        var writePackageCommand = '{"i":' + '"' + randomId + '"' +
            ', "m": "write_package", "p": {' +
            '"data": ' + '"' + base64data + '"' +
            ', "transferid": ' + '"' + transferid + '"' +
            '} }';

        sendDATA(writePackageCommand);
    
        return randomId;

    }

    UJSONRPC.getStorageStatus = function getStorageStatus() {
        
        var randomId = generateId();
        var command = '{"i":' + '"' + randomId + '"' +
            ', "m": "get_storage_status"' +
            '}';
        
        sendDATA(command);

    }

    UJSONRPC.removeProject = function removeProject(slotid) {

        var randomId = generateId();
        var command = '{"i":' + '"' + randomId + '"' +
            ', "m": "remove_project", "p": {' +
            '"slotid": ' + slotid + 
            '} }';
        
        sendDATA(command);
    }

    UJSONRPC.moveProject = function moveProject(oldslotid, newslotid) {

        var randomId = generateId();
        var command = '{"i":' + '"' + randomId + '"' +
            ', "m": "move_project", "p": {' +
            '"old_slotid": ' + oldslotid +
            ', "new_slotid: ' + newslotid +
            '} }';

        sendDATA(command);

    }


    //////////////////////////////////////////
    //                                      //
    //          Private Functions           //
    //                                      //
    //////////////////////////////////////////

    /** 
     * 
     * @private
     * @param {any} id 
     * @param {any} funcName 
     */
    function pushResponseCallback(id, funcName) {
        
        var toPush = []; // [ ujson string id, function pointer ]
        
        toPush.push(id);
        toPush.push(funcName);

        // responseCallbacks has elements in it
        if ( responseCallbacks.length > 0 ) {

            var emptyFound = false; // empty index was found flag

            // insert the pointer to the function where index is empty
            for ( var index in responseCallbacks ) {
                if ( responseCallbacks[index] == undefined) {
                    responseCallbacks[index] = toPush;
                    emptyFound = true;
                }
            }

            // if all indices were full, push to the back
            if (!emptyFound) {
                responseCallbacks.push(toPush);
            }
            
        }
        // responseCallbacks current has no elements in it
        else {
            responseCallbacks.push(toPush);
        }

    }
    /** <h4> Sleep function </h4>
     * @private
     * @param {number} ms Miliseconds to sleep
     * @returns {Promise} 
     */
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /** <h4> generate random id for UJSONRPC messages </h4>
     * 
     * @returns {string}
     */
    function generateId() {
        var generatedID = ""
        var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        
        for ( var i = 0; i < 4; i++ ) {
            var randomIndex = Math.floor(Math.random() * characters.length);
            generatedID = generatedID + characters[randomIndex];
        }

        return generatedID;
    }

    /** <h4> Prompt user to select web serial port and make connection to SPIKE Prime </h4>
     * <p> Effect Makes prompt in Google Chrome ( Google Chrome Browser needs "Experimental Web Interface" enabled) </p>
     * <p> Note: </p>
     * <p> This function is to be executed before reading in JSON RPC streams from the hub </p>
     * <p> This function needs to be called when system is handling a user gesture (like button click) </p>
     * @private
     * @returns {boolean} True if web serial initialization is successful, false otherwise
     */
    async function initWebSerial() {
        try {
            var success = false;

            port = await navigator.serial.getPorts();
            console.log("ports:", port);
            // select device
            port = await navigator.serial.requestPort({
                //filters: [filter]
            });
            // wait for the port to open.
            try {
                await port.open({ baudrate: 115200 });
            }
            catch (er) {
                console.log(er)
                if ( funcAfterError != undefined ) {
                    funcAfterError(er + "\nPlease try again. If error persists, refresh this environment.");
                }
                await port.close();
            }

            if (port.readable) {
                success = true;
            }
            else {
                success = false;
            }

            return success;


        } catch (e) {
            console.log("Cannot read port:", e);
            if ( funcAfterError != undefined ) {
                funcAfterError(e);
            }
            return false;
        }
    }

    /** <h4> Initialize writer object before sending commands </h4>
     * @private
     * 
     */
    function setupWriter() {
        // if writer not yet defined:
        if (typeof writer === 'undefined') {
            // set up writer for the first time
            const encoder = new TextEncoderStream();
            writableStreamClosed = encoder.readable.pipeTo(port.writable);
            writer = encoder.writable.getWriter();
        }
    }

    /** <h4> Continuously take UJSON RPC input from SPIKE Prime </h4>
     * @private
     */
    async function streamUJSONRPC() {
        try {
            // read when port is set up
            while (port.readable) {

                // initialize readers
                const decoder = new TextDecoderStream();
                const readableStreamClosed = port.readable.pipeTo(decoder.writable);
                reader = decoder.readable.getReader();

                // continuously get
                while (true) {
                    try {
                        // read UJSON RPC stream ( actual data in {value} )
                        ({ value, done } = await reader.read());
                        
                        // log value
                        if (micropython_interpreter) {
                            console.log(value);
                        }

                        //concatenate UJSONRPC packets into complete JSON objects
                        if (value) {

                            // stringify the packet to look for carriage return
                            var json_string = await JSON.stringify(value);

                            let findEscapedQuotes = /\\"/g;
                            let findNewLines = /\\n/g;

                            var cleanedJsonString = json_string.replace(findEscapedQuotes, '"');
                            cleanedJsonString = cleanedJsonString.substring(1,cleanedJsonString.length - 1);
                            // cleanedJsonString = cleanedJsonString.replace(findNewLines,'');

                            jsonline = jsonline + cleanedJsonString; // concatenate packet to data

                            // regex search for carriage return
                            let pattern = /\\r/g;
                            var carriageReIndex = jsonline.search(pattern);
                            
                            // there is at least one carriage return in this packet
                            if ( carriageReIndex > -1 ) {
                                
                                // the concatenated packets start with a left curly brace (start of JSON)
                                if ( jsonline[0] == "{" ) {

                                    lastUJSONRPC = jsonline.substring(0, carriageReIndex);

                                    // look for conjoined JSON packets: there's at least two carriage returns in jsonline
                                    if ( jsonline.match(/\\r/g).length > 1 ) {
                                        
                                        var conjoinedPacketsArray = jsonline.split(/\\r/); // array that split jsonline by \r

                                        // last index only contains "" as it would be after \r
                                        for ( var i = 0; i < conjoinedPacketsArray.length - 1; i++ ) {
                                            
                                            // for every JSON object in array, perform data handling

                                            lastUJSONRPC = conjoinedPacketsArray[i];

                                            try {
                                                var parseTest = await JSON.parse(lastUJSONRPC)

                                                // update hub information using lastUJSONRPC
                                                await updateHubPortsInfo();
                                                await PrimeHubEventHandler();
                                            }
                                            catch (e) {
                                                console.log(e);
                                                console.log("error parsing lastUJSONRPC: ", lastUJSONRPC);
                                                console.log("current jsonline: ", jsonline);
                                                console.log("current cleaned json_string: ", cleanedJsonString)
                                                console.log("current json_string: ", json_string);
                                                console.log("current value: ", value);

                                                if (funcAfterError != undefined) {
                                                    funcAfterError("Fatal Error: Please refresh this environment");
                                                }

                                            }

                                            jsonline = "";

                                        }
                                    }
                                    else {
                                        lastUJSONRPC = jsonline.substring(0, carriageReIndex);

                                        // // parsing test
                                        try {
                                            var parseTest = await JSON.parse(lastUJSONRPC)

                                            // update hub information using lastUJSONRPC
                                            await updateHubPortsInfo();
                                            await PrimeHubEventHandler();
                                        }
                                        catch (e) {
                                            console.log(e);
                                            console.log("error parsing lastUJSONRPC: ", lastUJSONRPC);
                                            console.log("current jsonline: ", jsonline);
                                            console.log("current cleaned json_string: ", cleanedJsonString)
                                            console.log("current json_string: ", json_string);
                                            console.log("current value: ", value);

                                            if (funcAfterError != undefined) {
                                                funcAfterError("Fatal Error: Please refresh this environment");
                                            }

                                        }

                                        jsonline = "";
                                    }

                                }
                                else {
                                    // reset jsonline for next concatenation
                                    jsonline = "";
                                }
                            }

                        }
                        if (done) {
                            serviceActive = false;
                            // reader has been canceled.
                            console.log("[readLoop] DONE", done);
                        }
                    }
                    // error handler
                    catch (error) {
                        console.log('[readLoop] ERROR', error);

                        serviceActive = false;
                        
                        if (funcAfterDisconnect != undefined) {
                            funcAfterDisconnect();
                        }

                        if ( funcAfterError != undefined ) {
                            funcAfterError("SPIKE Prime hub has been disconnected");
                        }

                        writer.close();
                        //await writer.releaseLock();
                        await writableStreamClosed;

                        reader.cancel();
                        //await reader.releaseLock();
                        await readableStreamClosed.catch(reason => { });

                        await port.close();

                        writer = undefined;
                        reader = undefined;
                        jsonline = "";
                        lastUJSONRPC = undefined;
                        json_string = undefined;
                        cleanedJsonString = undefined;

                        break; // stop trying to read
                    }
                } // end of: while (true) [reader loop]

                // release the lock
                reader.releaseLock();

            } // end of: while (port.readable) [checking if readable loop]
            console.log("- port.readable is FALSE")
        } // end of: trying to open port
        catch (e) {
            serviceActive = false;
            // Permission to access a device was denied implicitly or explicitly by the user.
            console.log('ERROR trying to open:', e);
        }
    }

    /** Get the devices that are connected to each port on the SPIKE Prime
     * <p> Effect: </p>
     * <p> Modifies {ports} global variable </p>
     * <p> Modifies {hub} global variable </p>
     * @private
     */
    async function updateHubPortsInfo() {

        // if a complete ujson rpc line was read
        if (lastUJSONRPC) {
            var data_stream; //UJSON RPC info to be parsed

            //get a line from the latest JSON RPC stream and parse to devices info
            try {
                data_stream = await JSON.parse(lastUJSONRPC);
                data_stream = data_stream.p;
            }
            catch (e) {
                console.log("error parsing lastUJSONRPC at updateHubPortsInfo", lastUJSONRPC);
                console.log(typeof lastUJSONRPC);
                console.log(lastUJSONRPC.p);

                if (funcAfterError != undefined) {
                    funcAfterError("Fatal Error: Please reboot the Hub and refresh this environment");
                }

            }

            var index_to_port = ["A", "B", "C", "D", "E", "F"]

            // iterate through each port and assign a device_type to {ports}
            for (var key = 0; key < 6; key++) {

                let device_value = { "device": "none", "data": {} }; // value to go in ports associated with the port letter keys

                try {
                    var letter = index_to_port[key]

                    // get SMALL MOTOR information
                    if (data_stream[key][0] == 48) {

                        // parse motor information
                        var Mspeed = await data_stream[key][1][0];
                        var Mangle = await data_stream[key][1][1];
                        var Muangle = await data_stream[key][1][2];
                        var Mpower = await data_stream[key][1][3];

                        // populate value object
                        device_value.device = "smallMotor";
                        device_value.data = { "speed": Mspeed, "angle": Mangle, "uAngle": Muangle, "power": Mpower };
                        ports[letter] = device_value;
                    }
                    // get BIG MOTOR information
                    else if (data_stream[key][0] == 49) {
                        // parse motor information
                        var Mspeed = await data_stream[key][1][0];
                        var Mangle = await data_stream[key][1][1];
                        var Muangle = await data_stream[key][1][2];
                        var Mpower = await data_stream[key][1][3];

                        // populate value object
                        device_value.device = "bigMotor";
                        device_value.data = { "speed": Mspeed, "angle": Mangle, "uAngle": Muangle, "power": Mpower };
                        ports[letter] = device_value;

                    }
                    // get ULTRASONIC sensor information
                    else if (data_stream[key][0] == 62) {

                        // parse ultrasonic sensor information
                        var Udist = await data_stream[key][1][0];

                        // populate value object
                        device_value.device = "ultrasonic";
                        device_value.data = { "distance": Udist };
                        ports[letter] = device_value;
                    }
                    // get FORCE sensor information
                    else if (data_stream[key][0] == 63) {

                        // parse force sensor information
                        var Famount = await data_stream[key][1][0];
                        var Fbinary = await data_stream[key][1][1];
                        var Fbigamount = await data_stream[key][1][2];
                        
                        // convert the binary output to boolean for "pressed" key
                        if ( Fbinary == 1 ) {
                            var Fboolean = true;
                        } else {
                            var Fboolean = false;
                        }
                        // execute callback from ForceSensor.wait_until_pressed() 
                        if (Fboolean) {
                            // execute call back from wait_until_pressed() if it is defined
                            funcAfterForceSensorPress !== undefined && funcAfterForceSensorPress();
                            
                            // destruct callback function
                            funcAfterForceSensorPress = undefined;

                            // indicate that the ForceSensor was pressed
                            ForceSensorWasPressed = true;
                        } 
                        // execute callback from ForceSensor.wait_until_released()
                        else {
                            // check if the Force Sensor was just released
                            if (ForceSensorWasPressed) {
                                ForceSensorWasPressed = false;
                                funcAfterForceSensorRelease !== undefined && funcAfterForceSensorRelease();
                                funcAfterForceSensorRelease = undefined;
                            }
                        }
                        
                        // populate value object
                        device_value.device = "force";
                        device_value.data = { "force": Famount, "pressed": Fboolean, "forceSensitive": Fbigamount }
                        ports[letter] = device_value;
                    }
                    // get COLOR sensor information
                    else if (data_stream[key][0] == 61) {

                        // parse color sensor information
                        var Creflected = await data_stream[key][1][0];
                        var Cambient = await data_stream[key][1][1];
                        var Cr = await data_stream[key][1][2];
                        var Cg = await data_stream[key][1][3];
                        var Cb = await data_stream[key][1][4];
                        var rgb_array = [Cr, Cg, Cb];

                        // populate value object
                        device_value.device = "color";
                        device_value.data = { "reflected": Creflected, "ambient": Cambient, "RGB": rgb_array };
                        ports[letter] = device_value;
                    }
                    /// NOTHING is connected
                    else if (data_stream[key][0] == 0) {
                        // populate value object
                        device_value.device = "none";
                        device_value.data = {};
                        ports[letter] = device_value;
                    }

                    //parse hub information
                    var gyro_x = data_stream[6][0];
                    var gyro_y = data_stream[6][1];
                    var gyro_z = data_stream[6][2];
                    var gyro = [gyro_x, gyro_y, gyro_z]; 
                    hub["gyro"] = gyro;
                    
                    var newOri = setHubOrientation(gyro);
                    // see if currently detected orientation is different from the last detected orientation
                    if ( newOri !== lastHubOrientation ) {
                        lastHubOrientation = newOri;

                        typeof funcAfterNewOrientation == "function" && funcAfterNewOrientation(newOri);
                        funcAfterNewOrientation = undefined;
                    }

                    var accel_x = data_stream[7][0];
                    var accel_y = data_stream[7][1];
                    var accel_z = data_stream[7][2];
                    var accel = [accel_x, accel_y, accel_z];
                    hub["accel"] = accel;

                    var posi_x = data_stream[8][0];
                    var posi_y = data_stream[8][1];
                    var posi_z = data_stream[8][2];
                    var pos = [posi_x, posi_y, posi_z];
                    hub["pos"] = pos;

                } catch (e) { } //ignore errors
            }
        }
    }

    /** <h4> Catch hub events in UJSONRPC </h4>
     * <p> Effect: </p>
     * <p> Logs in the console when some particular messages are caught </p>
     * <p> Assigns the hub events global variables </p>
     * @private
     */
    async function PrimeHubEventHandler() {

        var parsedUJSON = await JSON.parse(lastUJSONRPC);
        
        var messageType = parsedUJSON["m"];

        //catch runtime_error made at ujsonrpc level
        if (messageType == "runtime_error") {
            var decodedResponse = atob(parsedUJSON["p"][3]);

            decodedResponse = JSON.stringify(decodedResponse);

            console.log(decodedResponse);

            var splitData = decodedResponse.split(/\\n/); // split the code by every newline

            // execute function after print if defined (only print the last line of error message)
            if (funcAfterError != undefined) {
                funcAfterError(splitData[splitData.length-2] + "\nFatal Error: Please reboot the Hub");
            }
        }
        // storage information
        else if ( messageType == 1 ) {
            
            var storageInfo = parsedUJSON["p"]["slots"]; // get info of all the slots
            
            for ( var slotid in storageInfo ) {
                hubProjects[slotid] = storageInfo[slotid]; // reassign hubProjects global variable
            }

        }
        // battery status
        else if (messageType == 2) {
            batteryAmount = parsedUJSON["p"][1];
        }
        // give center button click, left, right (?)
        else if (messageType == 3) {
            console.log(lastUJSONRPC);
            if (parsedUJSON.p[0] == "center") {
                hubMainButton.pressed = true;

                if (parsedUJSON.p[1] > 0) {
                    hubMainButton.pressed = false;
                    hubMainButton.duration = parsedUJSON.p[1];
                }
            }
            else if (parsedUJSON.p[0] == "connect") {
                hubBluetoothButton.pressed = true;

                if (parsedUJSON.p[1] > 0) {
                    hubBluetoothButton.pressed = false;
                    hubBluetoothButton.duration = parsedUJSON.p[1];
                }
            }
            else if (parsedUJSON.p[0] == "left") {
                hubLeftButton.pressed = true;

                // execute callback for wait_until_pressed() if defined
                typeof funcAfterLeftButtonPress === "function" && funcAfterLeftButtonPress();
                funcAfterLeftButtonPress = undefined;

                if (parsedUJSON.p[1] > 0) {
                    hubLeftButton.pressed = false;
                    hubLeftButton.duration = parsedUJSON.p[1];

                    // execute callback for wait_until_released() if defined
                    typeof funcAfterLeftButtonRelease === "function" && funcAfterLeftButtonRelease();
                    funcAfterLeftButtonRelease = undefined;
                }

            }
            else if (parsedUJSON.p[0] == "right") {
                hubRightButton.pressed = true;

                // execute callback for wait_until_pressed() if defined
                typeof funcAfterRightButtonPress === "function" && funcAfterRightButtonPress();
                funcAfterRightButtonPress = undefined;

                if (parsedUJSON.p[1] > 0) {
                    hubRightButton.pressed = false;
                    hubRightButton.duration = parsedUJSON.p[1];

                    // execute callback for wait_until_released() if defined
                    typeof funcAfterRightButtonRelease === "function" && funcAfterRightButtonRelease();
                    funcAfterRightButtonRelease = undefined;
                }
            }

        }
        // gives orientation of the hub (leftside, up,..), tapping of hub, 
        else if (messageType == 4) {
            var isOrientationData = parsedUJSON.p == "up" || parsedUJSON.p == "down" || parsedUJSON.p == "back" || parsedUJSON.p == "front" || parsedUJSON.p == "leftSide" || parsedUJSON.p == "rightSide";
            var isGestureData = parsedUJSON.p == "freefall" || parsedUJSON.p == "shake" || parsedUJSON.p == "tapped" || parsedUJSON.p == "doubletapped"
            /* this data stream is about hub orientation */
            if (isOrientationData) {
                
                var newOrientation = parsedUJSON.p;
                
                if (newOrientation == "up") {
                    lastHubOrientation = "up";
                }
                else if (newOrientation == "down") {
                    lastHubOrientation = "down";
                }
                else if (newOrientation == "front") {
                    lastHubOrientation = "front";
                }
                else if (newOrientation == "back") {
                    lastHubOrientation = "back";
                }
                else if (newOrientation == "leftSide") {
                    lastHubOrientation = "leftSide";
                }
                else if (newOrientation == "rightSide") {
                    lastHubOrientation = "rightSide";
                }
            }
            /* this data stream is about hub gesture */
            else if (isGestureData) {
                
                var newGesture = parsedUJSON.p;
                
                if (newGesture == "freefall") {
                    hubGesture = "freefall";
                    hubGestures.push(newGesture);
                }
                else if (newGesture == "shake") {
                    hubGesture = "shake";
                    hubGestures.push("shaken"); // the string is different at higher level
                }
                else if (newGesture == "tapped") {
                    hubFrontEvent = "tapped";
                    hubGestures.push(newGesture);
                }
                else if (newGesture == "doubletapped") {
                    hubFrontEvent = "doubletapped";
                    hubGestures.push(newGesture);
                }

                // execute funcAfterNewGesture callback that was taken at wait_for_new_gesture()
                typeof funcAfterNewGesture === "function" && funcAfterNewGesture(newGesture);
                funcAfterNewGesture = undefined;

            }
            console.log(lastUJSONRPC);
        }
        else if (messageType == 0) {

        }
        else if (messageType == 11) {
            console.log(lastUJSONRPC);
        }
        else if (messageType == "userProgram.print") {
            var printedMessage = parsedUJSON["p"]["value"];
            var NLindex = printedMessage.search(/\\n/);
            printedMessage = await printedMessage.substring(0, NLindex);
            
            console.log(atob(printedMessage));

            // execute function after print if defined
            if (funcAfterPrint != undefined) {
                funcAfterPrint(atob(printedMessage));
            }
        }
        else {

            // general parameters check
            if (parsedUJSON["r"]) {
                if (parsedUJSON["r"]["slots"]) {
                    
                    var storageInfo = parsedUJSON["r"]["slots"]; // get info of all the slots

                    for (var slotid in storageInfo) {
                        hubProjects[slotid] = storageInfo[slotid]; // reassign hubProjects global variable
                    }

                }
            }

            console.log("received response: ", lastUJSONRPC);

            // iterate over responseCallbacks global variable
            for ( var index in responseCallbacks ) {

                var currCallbackInfo = responseCallbacks[index];

                // check if the message id of UJSONRPC corresponds to that of a response callback
                if ( currCallbackInfo[0] == parsedUJSON["i"] ) {
                    
                    var response = "null";

                    if ( parsedUJSON["r"] == 0 ) {
                        response = "done";
                    }
                    else if ( parsedUJSON["r"] == 2 ) {
                        response = "stalled";
                    }

                    // execute callback with the response
                    currCallbackInfo[1](response);

                    // empty the index of which callback that was just executed
                    responseCallbacks[index] = undefined;
                }
            }
            
            // execute the callback function after sending start_write_program UJSONRPC
            if ( startWriteProgramCallback != undefined ) {

                console.log("startWriteProgramCallback is defined. Looking for matching mesasage id...")

                // check if the message id of UJSONRPC corresponds to that of a response callback
                if (startWriteProgramCallback[0] == parsedUJSON["i"]) {

                    console.log("matching message id detected with startWriteProgramCallback[0]: ", startWriteProgramCallback[0])
                    
                    // get the information for the packet sending
                    var blocksize = parsedUJSON["r"]["blocksize"]; // maximum size of each packet to be sent in bytes
                    var transferid = parsedUJSON["r"]["transferid"]; // id to use for transferring this program

                    console.log("executing writePackageFunc expecting transferID of ", transferid);

                    // execute callback
                    await startWriteProgramCallback[1](blocksize, transferid);

                    console.log("deallocating startWriteProgramCallback");

                    // deallocate callback
                    startWriteProgramCallback = undefined;
                }
                
            }

            // check if the program should write packages for a program
            if ( writePackageInformation != undefined ) {

                console.log("writePackageInformation is defined. Looking for matching mesasage id...")

                // check if the message id of UJSONRPC corresponds to that of the first write_package script that was sent
                if (writePackageInformation[0] == parsedUJSON["i"]) {

                    console.log("matching message id detected with writePackageInformation[0]: ", writePackageInformation[0]);

                    // get the information for the package sending process
                    var remainingData = writePackageInformation[1];
                    var transferID = writePackageInformation[2];
                    var blocksize = writePackageInformation[3];

                    // the size of the remaining data to send is less than or equal to blocksize
                    if ( remainingData.length <= blocksize ) {
                        console.log("remaining data's length is less than or equal to blocksize");

                        // the size of remaining data is not zero
                        if ( remainingData.length != 0 ) {

                            var dataToSend = remainingData.substring(0, remainingData.length);

                            console.log("reminaing data's length is not zero, sending entire remaining data: ", dataToSend);
                            
                            var base64data = btoa(dataToSend);

                            UJSONRPC.writePackage(base64data, transferID);

                            console.log("deallocating writePackageInforamtion")

                            if (writeProgramCallback != undefined) {
                                
                                writeProgramCallback();
                            }


                            writePackageInformation = undefined;
                        }
                    }
                    // the size of remaining data is more than the blocksize
                    else if ( remainingData.length > blocksize ) {

                        console.log("remaining data's length is more than blocksize");

                        var dataToSend = remainingData.substsring(0, blocksize);
                        
                        console.log("sending blocksize amount of data: ", dataToSend)
                        
                        var base64data = btoa(dataToSend);

                        var messageid = UJSONRPC.writePackage(blocksize, remainingData.length);

                        console.log("expected response with message id of ", messageid);

                        var remainingData = dataToSend(blocksize, remainingData.length);

                        writePackageInformation = [messageid, remainingData, transferID, blocksize];   
                    }
                }

            }

        }
    }

    /** Get the orientation of the hub based on gyroscope values
     * 
     * @private
     * @param {(number|Array)} gyro 
     */
    function setHubOrientation(gyro) {
        var newOrientation;
        if (gyro[0] < 500 && gyro[0] > -500) {
            if (gyro[1] < 500 && gyro[1] > -500) {

                if (gyro[2] > 500) {
                    newOrientation = "front";
                }
                else if (gyro[2] < -500) {
                    newOrientation = "back";
                }
            }
            else if (gyro[1] > 500) {
                newOrientation = "leftside";
            }
            else if (gyro[1] < -500) {
                newOrientation = "rightside";
            }
        } else if (gyro[0] > 500) {
            newOrientation = "down";
        }
        else if (gyro[0] < -500) {
            newOrientation = "up";
        }

        return newOrientation;
    }

    // public members
    return {
        init: init,
        sendDATA: sendDATA,
        rebootHub: rebootHub,
        reachMicroPy: reachMicroPy,
        executeAfterInit: executeAfterInit,
        executeAfterPrint: executeAfterPrint,
        executeAfterError: executeAfterError,
        executeAfterDisconnect: executeAfterDisconnect,
        getPortsInfo: getPortsInfo,
        getPortInfo: getPortInfo,
        getBatteryStatus: getBatteryStatus,
        getHubInfo: getHubInfo,
        getProjects: getProjects,
        isActive: isActive,
        getBigMotorPorts: getBigMotorPorts,
        getSmallMotorPorts: getSmallMotorPorts,
        getUltrasonicPorts: getUltrasonicPorts,
        getColorPorts: getColorPorts,
        getForcePorts: getForcePorts,
        getMotorPorts: getMotorPorts,
        getLatestUJSON: getLatestUJSON,
        getBluetoothButton: getBluetoothButton,
        getMainButton: getMainButton,
        getLeftButton: getLeftButton,
        getRightButton: getRightButton,
        getHubGesture: getHubGesture,
        getHubFrontEvent: getHubFrontEvent,
        getHubOrientation: getHubOrientation,
        Motor: Motor,
        PrimeHub: PrimeHub,
        UJSONRPC: UJSONRPC,
        ForceSensor: ForceSensor,
        DistanceSensor: DistanceSensor,
        ColorSensor: ColorSensor,
        MotorPair: MotorPair,
        writeProgram: writeProgram,
        stopCurrentProgram: stopCurrentProgram,
        executeProgram: executeProgram
    };
}



/*

+-----------------------------------------------------------------+
|     Created by Chirag Mehta - http://chir.ag/projects/ntc       |
|-----------------------------------------------------------------|
|               ntc js (Name that Color JavaScript)               |
+-----------------------------------------------------------------+

All the functions, code, lists etc. have been written specifically
for the Name that Color JavaScript by Chirag Mehta unless otherwise
specified.

This script is released under the: Creative Commons License:
Attribution 2.5 http://creativecommons.org/licenses/by/2.5/

Sample Usage:

  <script type="text/javascript" src="ntc.js"></script>

  <script type="text/javascript">

    var n_match  = ntc.name("#6195ED");
    n_rgb        = n_match[0]; // This is the RGB value of the closest matching color
    n_name       = n_match[1]; // This is the text string for the name of the match
    n_exactmatch = n_match[2]; // True if exact color match, False if close-match

    alert(n_match);

  </script>

*/
var ntc = { init: function () { for (var e, a, F, r = 0; r < ntc.names.length; r++)e = "#" + ntc.names[r][0], a = ntc.rgb(e), F = ntc.hsl(e), ntc.names[r].push(a[0], a[1], a[2], F[0], F[1], F[2]) }, name: function (e) { if ((e = e.toUpperCase()).length < 3 || e.length > 7) return ["#000000", "Invalid Color: " + e, !1]; e.length % 3 == 0 && (e = "#" + e), 4 == e.length && (e = "#" + e.substr(1, 1) + e.substr(1, 1) + e.substr(2, 1) + e.substr(2, 1) + e.substr(3, 1) + e.substr(3, 1)); var a = ntc.rgb(e), F = a[0], r = a[1], n = a[2], o = ntc.hsl(e), i = o[0], C = o[1], B = o[2], l = 0; ndf2 = 0, ndf = 0; for (var D = -1, E = -1, t = 0; t < ntc.names.length; t++) { if (e == "#" + ntc.names[t][0]) return ["#" + ntc.names[t][0], ntc.names[t][1], !0]; l = Math.pow(F - ntc.names[t][2], 2) + Math.pow(r - ntc.names[t][3], 2) + Math.pow(n - ntc.names[t][4], 2), ndf2 = Math.pow(i - ntc.names[t][5], 2) + Math.pow(C - ntc.names[t][6], 2) + Math.pow(B - ntc.names[t][7], 2), ndf = l + 2 * ndf2, (E < 0 || E > ndf) && (E = ndf, D = t) } return D < 0 ? ["#000000", "Invalid Color: " + e, !1] : ["#" + ntc.names[D][0], ntc.names[D][1], !1] }, hsl: function (e) { var a, F, r, n, o, i, C = [parseInt("0x" + e.substring(1, 3)) / 255, parseInt("0x" + e.substring(3, 5)) / 255, parseInt("0x" + e.substring(5, 7)) / 255], B = C[0], l = C[1], D = C[2]; return a = Math.min(B, Math.min(l, D)), r = (F = Math.max(B, Math.max(l, D))) - a, o = 0, (i = (a + F) / 2) > 0 && i < 1 && (o = r / (i < .5 ? 2 * i : 2 - 2 * i)), n = 0, r > 0 && (F == B && F != l && (n += (l - D) / r), F == l && F != D && (n += 2 + (D - B) / r), F == D && F != B && (n += 4 + (B - l) / r), n /= 6), [parseInt(255 * n), parseInt(255 * o), parseInt(255 * i)] }, rgb: function (e) { return [parseInt("0x" + e.substring(1, 3)), parseInt("0x" + e.substring(3, 5)), parseInt("0x" + e.substring(5, 7))] }, names: [["000000", "Black"], ["000080", "Navy Blue"], ["0000C8", "Dark Blue"], ["0000FF", "Blue"], ["000741", "Stratos"], ["001B1C", "Swamp"], ["002387", "Resolution Blue"], ["002900", "Deep Fir"], ["002E20", "Burnham"], ["002FA7", "International Klein Blue"], ["003153", "Prussian Blue"], ["003366", "Midnight Blue"], ["003399", "Smalt"], ["003532", "Deep Teal"], ["003E40", "Cyprus"], ["004620", "Kaitoke Green"], ["0047AB", "Cobalt"], ["004816", "Crusoe"], ["004950", "Sherpa Blue"], ["0056A7", "Endeavour"], ["00581A", "Camarone"], ["0066CC", "Science Blue"], ["0066FF", "Blue Ribbon"], ["00755E", "Tropical Rain Forest"], ["0076A3", "Allports"], ["007BA7", "Deep Cerulean"], ["007EC7", "Lochmara"], ["007FFF", "Azure Radiance"], ["008080", "Teal"], ["0095B6", "Bondi Blue"], ["009DC4", "Pacific Blue"], ["00A693", "Persian Green"], ["00A86B", "Jade"], ["00CC99", "Caribbean Green"], ["00CCCC", "Robin's Egg Blue"], ["00FF00", "Green"], ["00FF7F", "Spring Green"], ["00FFFF", "Cyan / Aqua"], ["010D1A", "Blue Charcoal"], ["011635", "Midnight"], ["011D13", "Holly"], ["012731", "Daintree"], ["01361C", "Cardin Green"], ["01371A", "County Green"], ["013E62", "Astronaut Blue"], ["013F6A", "Regal Blue"], ["014B43", "Aqua Deep"], ["015E85", "Orient"], ["016162", "Blue Stone"], ["016D39", "Fun Green"], ["01796F", "Pine Green"], ["017987", "Blue Lagoon"], ["01826B", "Deep Sea"], ["01A368", "Green Haze"], ["022D15", "English Holly"], ["02402C", "Sherwood Green"], ["02478E", "Congress Blue"], ["024E46", "Evening Sea"], ["026395", "Bahama Blue"], ["02866F", "Observatory"], ["02A4D3", "Cerulean"], ["03163C", "Tangaroa"], ["032B52", "Green Vogue"], ["036A6E", "Mosque"], ["041004", "Midnight Moss"], ["041322", "Black Pearl"], ["042E4C", "Blue Whale"], ["044022", "Zuccini"], ["044259", "Teal Blue"], ["051040", "Deep Cove"], ["051657", "Gulf Blue"], ["055989", "Venice Blue"], ["056F57", "Watercourse"], ["062A78", "Catalina Blue"], ["063537", "Tiber"], ["069B81", "Gossamer"], ["06A189", "Niagara"], ["073A50", "Tarawera"], ["080110", "Jaguar"], ["081910", "Black Bean"], ["082567", "Deep Sapphire"], ["088370", "Elf Green"], ["08E8DE", "Bright Turquoise"], ["092256", "Downriver"], ["09230F", "Palm Green"], ["09255D", "Madison"], ["093624", "Bottle Green"], ["095859", "Deep Sea Green"], ["097F4B", "Salem"], ["0A001C", "Black Russian"], ["0A480D", "Dark Fern"], ["0A6906", "Japanese Laurel"], ["0A6F75", "Atoll"], ["0B0B0B", "Cod Gray"], ["0B0F08", "Marshland"], ["0B1107", "Gordons Green"], ["0B1304", "Black Forest"], ["0B6207", "San Felix"], ["0BDA51", "Malachite"], ["0C0B1D", "Ebony"], ["0C0D0F", "Woodsmoke"], ["0C1911", "Racing Green"], ["0C7A79", "Surfie Green"], ["0C8990", "Blue Chill"], ["0D0332", "Black Rock"], ["0D1117", "Bunker"], ["0D1C19", "Aztec"], ["0D2E1C", "Bush"], ["0E0E18", "Cinder"], ["0E2A30", "Firefly"], ["0F2D9E", "Torea Bay"], ["10121D", "Vulcan"], ["101405", "Green Waterloo"], ["105852", "Eden"], ["110C6C", "Arapawa"], ["120A8F", "Ultramarine"], ["123447", "Elephant"], ["126B40", "Jewel"], ["130000", "Diesel"], ["130A06", "Asphalt"], ["13264D", "Blue Zodiac"], ["134F19", "Parsley"], ["140600", "Nero"], ["1450AA", "Tory Blue"], ["151F4C", "Bunting"], ["1560BD", "Denim"], ["15736B", "Genoa"], ["161928", "Mirage"], ["161D10", "Hunter Green"], ["162A40", "Big Stone"], ["163222", "Celtic"], ["16322C", "Timber Green"], ["163531", "Gable Green"], ["171F04", "Pine Tree"], ["175579", "Chathams Blue"], ["182D09", "Deep Forest Green"], ["18587A", "Blumine"], ["19330E", "Palm Leaf"], ["193751", "Nile Blue"], ["1959A8", "Fun Blue"], ["1A1A68", "Lucky Point"], ["1AB385", "Mountain Meadow"], ["1B0245", "Tolopea"], ["1B1035", "Haiti"], ["1B127B", "Deep Koamaru"], ["1B1404", "Acadia"], ["1B2F11", "Seaweed"], ["1B3162", "Biscay"], ["1B659D", "Matisse"], ["1C1208", "Crowshead"], ["1C1E13", "Rangoon Green"], ["1C39BB", "Persian Blue"], ["1C402E", "Everglade"], ["1C7C7D", "Elm"], ["1D6142", "Green Pea"], ["1E0F04", "Creole"], ["1E1609", "Karaka"], ["1E1708", "El Paso"], ["1E385B", "Cello"], ["1E433C", "Te Papa Green"], ["1E90FF", "Dodger Blue"], ["1E9AB0", "Eastern Blue"], ["1F120F", "Night Rider"], ["1FC2C2", "Java"], ["20208D", "Jacksons Purple"], ["202E54", "Cloud Burst"], ["204852", "Blue Dianne"], ["211A0E", "Eternity"], ["220878", "Deep Blue"], ["228B22", "Forest Green"], ["233418", "Mallard"], ["240A40", "Violet"], ["240C02", "Kilamanjaro"], ["242A1D", "Log Cabin"], ["242E16", "Black Olive"], ["24500F", "Green House"], ["251607", "Graphite"], ["251706", "Cannon Black"], ["251F4F", "Port Gore"], ["25272C", "Shark"], ["25311C", "Green Kelp"], ["2596D1", "Curious Blue"], ["260368", "Paua"], ["26056A", "Paris M"], ["261105", "Wood Bark"], ["261414", "Gondola"], ["262335", "Steel Gray"], ["26283B", "Ebony Clay"], ["273A81", "Bay of Many"], ["27504B", "Plantation"], ["278A5B", "Eucalyptus"], ["281E15", "Oil"], ["283A77", "Astronaut"], ["286ACD", "Mariner"], ["290C5E", "Violent Violet"], ["292130", "Bastille"], ["292319", "Zeus"], ["292937", "Charade"], ["297B9A", "Jelly Bean"], ["29AB87", "Jungle Green"], ["2A0359", "Cherry Pie"], ["2A140E", "Coffee Bean"], ["2A2630", "Baltic Sea"], ["2A380B", "Turtle Green"], ["2A52BE", "Cerulean Blue"], ["2B0202", "Sepia Black"], ["2B194F", "Valhalla"], ["2B3228", "Heavy Metal"], ["2C0E8C", "Blue Gem"], ["2C1632", "Revolver"], ["2C2133", "Bleached Cedar"], ["2C8C84", "Lochinvar"], ["2D2510", "Mikado"], ["2D383A", "Outer Space"], ["2D569B", "St Tropaz"], ["2E0329", "Jacaranda"], ["2E1905", "Jacko Bean"], ["2E3222", "Rangitoto"], ["2E3F62", "Rhino"], ["2E8B57", "Sea Green"], ["2EBFD4", "Scooter"], ["2F270E", "Onion"], ["2F3CB3", "Governor Bay"], ["2F519E", "Sapphire"], ["2F5A57", "Spectra"], ["2F6168", "Casal"], ["300529", "Melanzane"], ["301F1E", "Cocoa Brown"], ["302A0F", "Woodrush"], ["304B6A", "San Juan"], ["30D5C8", "Turquoise"], ["311C17", "Eclipse"], ["314459", "Pickled Bluewood"], ["315BA1", "Azure"], ["31728D", "Calypso"], ["317D82", "Paradiso"], ["32127A", "Persian Indigo"], ["32293A", "Blackcurrant"], ["323232", "Mine Shaft"], ["325D52", "Stromboli"], ["327C14", "Bilbao"], ["327DA0", "Astral"], ["33036B", "Christalle"], ["33292F", "Thunder"], ["33CC99", "Shamrock"], ["341515", "Tamarind"], ["350036", "Mardi Gras"], ["350E42", "Valentino"], ["350E57", "Jagger"], ["353542", "Tuna"], ["354E8C", "Chambray"], ["363050", "Martinique"], ["363534", "Tuatara"], ["363C0D", "Waiouru"], ["36747D", "Ming"], ["368716", "La Palma"], ["370202", "Chocolate"], ["371D09", "Clinker"], ["37290E", "Brown Tumbleweed"], ["373021", "Birch"], ["377475", "Oracle"], ["380474", "Blue Diamond"], ["381A51", "Grape"], ["383533", "Dune"], ["384555", "Oxford Blue"], ["384910", "Clover"], ["394851", "Limed Spruce"], ["396413", "Dell"], ["3A0020", "Toledo"], ["3A2010", "Sambuca"], ["3A2A6A", "Jacarta"], ["3A686C", "William"], ["3A6A47", "Killarney"], ["3AB09E", "Keppel"], ["3B000B", "Temptress"], ["3B0910", "Aubergine"], ["3B1F1F", "Jon"], ["3B2820", "Treehouse"], ["3B7A57", "Amazon"], ["3B91B4", "Boston Blue"], ["3C0878", "Windsor"], ["3C1206", "Rebel"], ["3C1F76", "Meteorite"], ["3C2005", "Dark Ebony"], ["3C3910", "Camouflage"], ["3C4151", "Bright Gray"], ["3C4443", "Cape Cod"], ["3C493A", "Lunar Green"], ["3D0C02", "Bean  "], ["3D2B1F", "Bistre"], ["3D7D52", "Goblin"], ["3E0480", "Kingfisher Daisy"], ["3E1C14", "Cedar"], ["3E2B23", "English Walnut"], ["3E2C1C", "Black Marlin"], ["3E3A44", "Ship Gray"], ["3EABBF", "Pelorous"], ["3F2109", "Bronze"], ["3F2500", "Cola"], ["3F3002", "Madras"], ["3F307F", "Minsk"], ["3F4C3A", "Cabbage Pont"], ["3F583B", "Tom Thumb"], ["3F5D53", "Mineral Green"], ["3FC1AA", "Puerto Rico"], ["3FFF00", "Harlequin"], ["401801", "Brown Pod"], ["40291D", "Cork"], ["403B38", "Masala"], ["403D19", "Thatch Green"], ["405169", "Fiord"], ["40826D", "Viridian"], ["40A860", "Chateau Green"], ["410056", "Ripe Plum"], ["411F10", "Paco"], ["412010", "Deep Oak"], ["413C37", "Merlin"], ["414257", "Gun Powder"], ["414C7D", "East Bay"], ["4169E1", "Royal Blue"], ["41AA78", "Ocean Green"], ["420303", "Burnt Maroon"], ["423921", "Lisbon Brown"], ["427977", "Faded Jade"], ["431560", "Scarlet Gum"], ["433120", "Iroko"], ["433E37", "Armadillo"], ["434C59", "River Bed"], ["436A0D", "Green Leaf"], ["44012D", "Barossa"], ["441D00", "Morocco Brown"], ["444954", "Mako"], ["454936", "Kelp"], ["456CAC", "San Marino"], ["45B1E8", "Picton Blue"], ["460B41", "Loulou"], ["462425", "Crater Brown"], ["465945", "Gray Asparagus"], ["4682B4", "Steel Blue"], ["480404", "Rustic Red"], ["480607", "Bulgarian Rose"], ["480656", "Clairvoyant"], ["481C1C", "Cocoa Bean"], ["483131", "Woody Brown"], ["483C32", "Taupe"], ["49170C", "Van Cleef"], ["492615", "Brown Derby"], ["49371B", "Metallic Bronze"], ["495400", "Verdun Green"], ["496679", "Blue Bayoux"], ["497183", "Bismark"], ["4A2A04", "Bracken"], ["4A3004", "Deep Bronze"], ["4A3C30", "Mondo"], ["4A4244", "Tundora"], ["4A444B", "Gravel"], ["4A4E5A", "Trout"], ["4B0082", "Pigment Indigo"], ["4B5D52", "Nandor"], ["4C3024", "Saddle"], ["4C4F56", "Abbey"], ["4D0135", "Blackberry"], ["4D0A18", "Cab Sav"], ["4D1E01", "Indian Tan"], ["4D282D", "Cowboy"], ["4D282E", "Livid Brown"], ["4D3833", "Rock"], ["4D3D14", "Punga"], ["4D400F", "Bronzetone"], ["4D5328", "Woodland"], ["4E0606", "Mahogany"], ["4E2A5A", "Bossanova"], ["4E3B41", "Matterhorn"], ["4E420C", "Bronze Olive"], ["4E4562", "Mulled Wine"], ["4E6649", "Axolotl"], ["4E7F9E", "Wedgewood"], ["4EABD1", "Shakespeare"], ["4F1C70", "Honey Flower"], ["4F2398", "Daisy Bush"], ["4F69C6", "Indigo"], ["4F7942", "Fern Green"], ["4F9D5D", "Fruit Salad"], ["4FA83D", "Apple"], ["504351", "Mortar"], ["507096", "Kashmir Blue"], ["507672", "Cutty Sark"], ["50C878", "Emerald"], ["514649", "Emperor"], ["516E3D", "Chalet Green"], ["517C66", "Como"], ["51808F", "Smalt Blue"], ["52001F", "Castro"], ["520C17", "Maroon Oak"], ["523C94", "Gigas"], ["533455", "Voodoo"], ["534491", "Victoria"], ["53824B", "Hippie Green"], ["541012", "Heath"], ["544333", "Judge Gray"], ["54534D", "Fuscous Gray"], ["549019", "Vida Loca"], ["55280C", "Cioccolato"], ["555B10", "Saratoga"], ["556D56", "Finlandia"], ["5590D9", "Havelock Blue"], ["56B4BE", "Fountain Blue"], ["578363", "Spring Leaves"], ["583401", "Saddle Brown"], ["585562", "Scarpa Flow"], ["587156", "Cactus"], ["589AAF", "Hippie Blue"], ["591D35", "Wine Berry"], ["592804", "Brown Bramble"], ["593737", "Congo Brown"], ["594433", "Millbrook"], ["5A6E9C", "Waikawa Gray"], ["5A87A0", "Horizon"], ["5B3013", "Jambalaya"], ["5C0120", "Bordeaux"], ["5C0536", "Mulberry Wood"], ["5C2E01", "Carnaby Tan"], ["5C5D75", "Comet"], ["5D1E0F", "Redwood"], ["5D4C51", "Don Juan"], ["5D5C58", "Chicago"], ["5D5E37", "Verdigris"], ["5D7747", "Dingley"], ["5DA19F", "Breaker Bay"], ["5E483E", "Kabul"], ["5E5D3B", "Hemlock"], ["5F3D26", "Irish Coffee"], ["5F5F6E", "Mid Gray"], ["5F6672", "Shuttle Gray"], ["5FA777", "Aqua Forest"], ["5FB3AC", "Tradewind"], ["604913", "Horses Neck"], ["605B73", "Smoky"], ["606E68", "Corduroy"], ["6093D1", "Danube"], ["612718", "Espresso"], ["614051", "Eggplant"], ["615D30", "Costa Del Sol"], ["61845F", "Glade Green"], ["622F30", "Buccaneer"], ["623F2D", "Quincy"], ["624E9A", "Butterfly Bush"], ["625119", "West Coast"], ["626649", "Finch"], ["639A8F", "Patina"], ["63B76C", "Fern"], ["6456B7", "Blue Violet"], ["646077", "Dolphin"], ["646463", "Storm Dust"], ["646A54", "Siam"], ["646E75", "Nevada"], ["6495ED", "Cornflower Blue"], ["64CCDB", "Viking"], ["65000B", "Rosewood"], ["651A14", "Cherrywood"], ["652DC1", "Purple Heart"], ["657220", "Fern Frond"], ["65745D", "Willow Grove"], ["65869F", "Hoki"], ["660045", "Pompadour"], ["660099", "Purple"], ["66023C", "Tyrian Purple"], ["661010", "Dark Tan"], ["66B58F", "Silver Tree"], ["66FF00", "Bright Green"], ["66FF66", "Screamin' Green"], ["67032D", "Black Rose"], ["675FA6", "Scampi"], ["676662", "Ironside Gray"], ["678975", "Viridian Green"], ["67A712", "Christi"], ["683600", "Nutmeg Wood Finish"], ["685558", "Zambezi"], ["685E6E", "Salt Box"], ["692545", "Tawny Port"], ["692D54", "Finn"], ["695F62", "Scorpion"], ["697E9A", "Lynch"], ["6A442E", "Spice"], ["6A5D1B", "Himalaya"], ["6A6051", "Soya Bean"], ["6B2A14", "Hairy Heath"], ["6B3FA0", "Royal Purple"], ["6B4E31", "Shingle Fawn"], ["6B5755", "Dorado"], ["6B8BA2", "Bermuda Gray"], ["6B8E23", "Olive Drab"], ["6C3082", "Eminence"], ["6CDAE7", "Turquoise Blue"], ["6D0101", "Lonestar"], ["6D5E54", "Pine Cone"], ["6D6C6C", "Dove Gray"], ["6D9292", "Juniper"], ["6D92A1", "Gothic"], ["6E0902", "Red Oxide"], ["6E1D14", "Moccaccino"], ["6E4826", "Pickled Bean"], ["6E4B26", "Dallas"], ["6E6D57", "Kokoda"], ["6E7783", "Pale Sky"], ["6F440C", "Cafe Royale"], ["6F6A61", "Flint"], ["6F8E63", "Highland"], ["6F9D02", "Limeade"], ["6FD0C5", "Downy"], ["701C1C", "Persian Plum"], ["704214", "Sepia"], ["704A07", "Antique Bronze"], ["704F50", "Ferra"], ["706555", "Coffee"], ["708090", "Slate Gray"], ["711A00", "Cedar Wood Finish"], ["71291D", "Metallic Copper"], ["714693", "Affair"], ["714AB2", "Studio"], ["715D47", "Tobacco Brown"], ["716338", "Yellow Metal"], ["716B56", "Peat"], ["716E10", "Olivetone"], ["717486", "Storm Gray"], ["718080", "Sirocco"], ["71D9E2", "Aquamarine Blue"], ["72010F", "Venetian Red"], ["724A2F", "Old Copper"], ["726D4E", "Go Ben"], ["727B89", "Raven"], ["731E8F", "Seance"], ["734A12", "Raw Umber"], ["736C9F", "Kimberly"], ["736D58", "Crocodile"], ["737829", "Crete"], ["738678", "Xanadu"], ["74640D", "Spicy Mustard"], ["747D63", "Limed Ash"], ["747D83", "Rolling Stone"], ["748881", "Blue Smoke"], ["749378", "Laurel"], ["74C365", "Mantis"], ["755A57", "Russett"], ["7563A8", "Deluge"], ["76395D", "Cosmic"], ["7666C6", "Blue Marguerite"], ["76BD17", "Lima"], ["76D7EA", "Sky Blue"], ["770F05", "Dark Burgundy"], ["771F1F", "Crown of Thorns"], ["773F1A", "Walnut"], ["776F61", "Pablo"], ["778120", "Pacifika"], ["779E86", "Oxley"], ["77DD77", "Pastel Green"], ["780109", "Japanese Maple"], ["782D19", "Mocha"], ["782F16", "Peanut"], ["78866B", "Camouflage Green"], ["788A25", "Wasabi"], ["788BBA", "Ship Cove"], ["78A39C", "Sea Nymph"], ["795D4C", "Roman Coffee"], ["796878", "Old Lavender"], ["796989", "Rum"], ["796A78", "Fedora"], ["796D62", "Sandstone"], ["79DEEC", "Spray"], ["7A013A", "Siren"], ["7A58C1", "Fuchsia Blue"], ["7A7A7A", "Boulder"], ["7A89B8", "Wild Blue Yonder"], ["7AC488", "De York"], ["7B3801", "Red Beech"], ["7B3F00", "Cinnamon"], ["7B6608", "Yukon Gold"], ["7B7874", "Tapa"], ["7B7C94", "Waterloo "], ["7B8265", "Flax Smoke"], ["7B9F80", "Amulet"], ["7BA05B", "Asparagus"], ["7C1C05", "Kenyan Copper"], ["7C7631", "Pesto"], ["7C778A", "Topaz"], ["7C7B7A", "Concord"], ["7C7B82", "Jumbo"], ["7C881A", "Trendy Green"], ["7CA1A6", "Gumbo"], ["7CB0A1", "Acapulco"], ["7CB7BB", "Neptune"], ["7D2C14", "Pueblo"], ["7DA98D", "Bay Leaf"], ["7DC8F7", "Malibu"], ["7DD8C6", "Bermuda"], ["7E3A15", "Copper Canyon"], ["7F1734", "Claret"], ["7F3A02", "Peru Tan"], ["7F626D", "Falcon"], ["7F7589", "Mobster"], ["7F76D3", "Moody Blue"], ["7FFF00", "Chartreuse"], ["7FFFD4", "Aquamarine"], ["800000", "Maroon"], ["800B47", "Rose Bud Cherry"], ["801818", "Falu Red"], ["80341F", "Red Robin"], ["803790", "Vivid Violet"], ["80461B", "Russet"], ["807E79", "Friar Gray"], ["808000", "Olive"], ["808080", "Gray"], ["80B3AE", "Gulf Stream"], ["80B3C4", "Glacier"], ["80CCEA", "Seagull"], ["81422C", "Nutmeg"], ["816E71", "Spicy Pink"], ["817377", "Empress"], ["819885", "Spanish Green"], ["826F65", "Sand Dune"], ["828685", "Gunsmoke"], ["828F72", "Battleship Gray"], ["831923", "Merlot"], ["837050", "Shadow"], ["83AA5D", "Chelsea Cucumber"], ["83D0C6", "Monte Carlo"], ["843179", "Plum"], ["84A0A0", "Granny Smith"], ["8581D9", "Chetwode Blue"], ["858470", "Bandicoot"], ["859FAF", "Bali Hai"], ["85C4CC", "Half Baked"], ["860111", "Red Devil"], ["863C3C", "Lotus"], ["86483C", "Ironstone"], ["864D1E", "Bull Shot"], ["86560A", "Rusty Nail"], ["868974", "Bitter"], ["86949F", "Regent Gray"], ["871550", "Disco"], ["87756E", "Americano"], ["877C7B", "Hurricane"], ["878D91", "Oslo Gray"], ["87AB39", "Sushi"], ["885342", "Spicy Mix"], ["886221", "Kumera"], ["888387", "Suva Gray"], ["888D65", "Avocado"], ["893456", "Camelot"], ["893843", "Solid Pink"], ["894367", "Cannon Pink"], ["897D6D", "Makara"], ["8A3324", "Burnt Umber"], ["8A73D6", "True V"], ["8A8360", "Clay Creek"], ["8A8389", "Monsoon"], ["8A8F8A", "Stack"], ["8AB9F1", "Jordy Blue"], ["8B00FF", "Electric Violet"], ["8B0723", "Monarch"], ["8B6B0B", "Corn Harvest"], ["8B8470", "Olive Haze"], ["8B847E", "Schooner"], ["8B8680", "Natural Gray"], ["8B9C90", "Mantle"], ["8B9FEE", "Portage"], ["8BA690", "Envy"], ["8BA9A5", "Cascade"], ["8BE6D8", "Riptide"], ["8C055E", "Cardinal Pink"], ["8C472F", "Mule Fawn"], ["8C5738", "Potters Clay"], ["8C6495", "Trendy Pink"], ["8D0226", "Paprika"], ["8D3D38", "Sanguine Brown"], ["8D3F3F", "Tosca"], ["8D7662", "Cement"], ["8D8974", "Granite Green"], ["8D90A1", "Manatee"], ["8DA8CC", "Polo Blue"], ["8E0000", "Red Berry"], ["8E4D1E", "Rope"], ["8E6F70", "Opium"], ["8E775E", "Domino"], ["8E8190", "Mamba"], ["8EABC1", "Nepal"], ["8F021C", "Pohutukawa"], ["8F3E33", "El Salva"], ["8F4B0E", "Korma"], ["8F8176", "Squirrel"], ["8FD6B4", "Vista Blue"], ["900020", "Burgundy"], ["901E1E", "Old Brick"], ["907874", "Hemp"], ["907B71", "Almond Frost"], ["908D39", "Sycamore"], ["92000A", "Sangria"], ["924321", "Cumin"], ["926F5B", "Beaver"], ["928573", "Stonewall"], ["928590", "Venus"], ["9370DB", "Medium Purple"], ["93CCEA", "Cornflower"], ["93DFB8", "Algae Green"], ["944747", "Copper Rust"], ["948771", "Arrowtown"], ["950015", "Scarlett"], ["956387", "Strikemaster"], ["959396", "Mountain Mist"], ["960018", "Carmine"], ["964B00", "Brown"], ["967059", "Leather"], ["9678B6", "Purple Mountain's Majesty"], ["967BB6", "Lavender Purple"], ["96A8A1", "Pewter"], ["96BBAB", "Summer Green"], ["97605D", "Au Chico"], ["9771B5", "Wisteria"], ["97CD2D", "Atlantis"], ["983D61", "Vin Rouge"], ["9874D3", "Lilac Bush"], ["98777B", "Bazaar"], ["98811B", "Hacienda"], ["988D77", "Pale Oyster"], ["98FF98", "Mint Green"], ["990066", "Fresh Eggplant"], ["991199", "Violet Eggplant"], ["991613", "Tamarillo"], ["991B07", "Totem Pole"], ["996666", "Copper Rose"], ["9966CC", "Amethyst"], ["997A8D", "Mountbatten Pink"], ["9999CC", "Blue Bell"], ["9A3820", "Prairie Sand"], ["9A6E61", "Toast"], ["9A9577", "Gurkha"], ["9AB973", "Olivine"], ["9AC2B8", "Shadow Green"], ["9B4703", "Oregon"], ["9B9E8F", "Lemon Grass"], ["9C3336", "Stiletto"], ["9D5616", "Hawaiian Tan"], ["9DACB7", "Gull Gray"], ["9DC209", "Pistachio"], ["9DE093", "Granny Smith Apple"], ["9DE5FF", "Anakiwa"], ["9E5302", "Chelsea Gem"], ["9E5B40", "Sepia Skin"], ["9EA587", "Sage"], ["9EA91F", "Citron"], ["9EB1CD", "Rock Blue"], ["9EDEE0", "Morning Glory"], ["9F381D", "Cognac"], ["9F821C", "Reef Gold"], ["9F9F9C", "Star Dust"], ["9FA0B1", "Santas Gray"], ["9FD7D3", "Sinbad"], ["9FDD8C", "Feijoa"], ["A02712", "Tabasco"], ["A1750D", "Buttered Rum"], ["A1ADB5", "Hit Gray"], ["A1C50A", "Citrus"], ["A1DAD7", "Aqua Island"], ["A1E9DE", "Water Leaf"], ["A2006D", "Flirt"], ["A23B6C", "Rouge"], ["A26645", "Cape Palliser"], ["A2AAB3", "Gray Chateau"], ["A2AEAB", "Edward"], ["A3807B", "Pharlap"], ["A397B4", "Amethyst Smoke"], ["A3E3ED", "Blizzard Blue"], ["A4A49D", "Delta"], ["A4A6D3", "Wistful"], ["A4AF6E", "Green Smoke"], ["A50B5E", "Jazzberry Jam"], ["A59B91", "Zorba"], ["A5CB0C", "Bahia"], ["A62F20", "Roof Terracotta"], ["A65529", "Paarl"], ["A68B5B", "Barley Corn"], ["A69279", "Donkey Brown"], ["A6A29A", "Dawn"], ["A72525", "Mexican Red"], ["A7882C", "Luxor Gold"], ["A85307", "Rich Gold"], ["A86515", "Reno Sand"], ["A86B6B", "Coral Tree"], ["A8989B", "Dusty Gray"], ["A899E6", "Dull Lavender"], ["A8A589", "Tallow"], ["A8AE9C", "Bud"], ["A8AF8E", "Locust"], ["A8BD9F", "Norway"], ["A8E3BD", "Chinook"], ["A9A491", "Gray Olive"], ["A9ACB6", "Aluminium"], ["A9B2C3", "Cadet Blue"], ["A9B497", "Schist"], ["A9BDBF", "Tower Gray"], ["A9BEF2", "Perano"], ["A9C6C2", "Opal"], ["AA375A", "Night Shadz"], ["AA4203", "Fire"], ["AA8B5B", "Muesli"], ["AA8D6F", "Sandal"], ["AAA5A9", "Shady Lady"], ["AAA9CD", "Logan"], ["AAABB7", "Spun Pearl"], ["AAD6E6", "Regent St Blue"], ["AAF0D1", "Magic Mint"], ["AB0563", "Lipstick"], ["AB3472", "Royal Heath"], ["AB917A", "Sandrift"], ["ABA0D9", "Cold Purple"], ["ABA196", "Bronco"], ["AC8A56", "Limed Oak"], ["AC91CE", "East Side"], ["AC9E22", "Lemon Ginger"], ["ACA494", "Napa"], ["ACA586", "Hillary"], ["ACA59F", "Cloudy"], ["ACACAC", "Silver Chalice"], ["ACB78E", "Swamp Green"], ["ACCBB1", "Spring Rain"], ["ACDD4D", "Conifer"], ["ACE1AF", "Celadon"], ["AD781B", "Mandalay"], ["ADBED1", "Casper"], ["ADDFAD", "Moss Green"], ["ADE6C4", "Padua"], ["ADFF2F", "Green Yellow"], ["AE4560", "Hippie Pink"], ["AE6020", "Desert"], ["AE809E", "Bouquet"], ["AF4035", "Medium Carmine"], ["AF4D43", "Apple Blossom"], ["AF593E", "Brown Rust"], ["AF8751", "Driftwood"], ["AF8F2C", "Alpine"], ["AF9F1C", "Lucky"], ["AFA09E", "Martini"], ["AFB1B8", "Bombay"], ["AFBDD9", "Pigeon Post"], ["B04C6A", "Cadillac"], ["B05D54", "Matrix"], ["B05E81", "Tapestry"], ["B06608", "Mai Tai"], ["B09A95", "Del Rio"], ["B0E0E6", "Powder Blue"], ["B0E313", "Inch Worm"], ["B10000", "Bright Red"], ["B14A0B", "Vesuvius"], ["B1610B", "Pumpkin Skin"], ["B16D52", "Santa Fe"], ["B19461", "Teak"], ["B1E2C1", "Fringy Flower"], ["B1F4E7", "Ice Cold"], ["B20931", "Shiraz"], ["B2A1EA", "Biloba Flower"], ["B32D29", "Tall Poppy"], ["B35213", "Fiery Orange"], ["B38007", "Hot Toddy"], ["B3AF95", "Taupe Gray"], ["B3C110", "La Rioja"], ["B43332", "Well Read"], ["B44668", "Blush"], ["B4CFD3", "Jungle Mist"], ["B57281", "Turkish Rose"], ["B57EDC", "Lavender"], ["B5A27F", "Mongoose"], ["B5B35C", "Olive Green"], ["B5D2CE", "Jet Stream"], ["B5ECDF", "Cruise"], ["B6316C", "Hibiscus"], ["B69D98", "Thatch"], ["B6B095", "Heathered Gray"], ["B6BAA4", "Eagle"], ["B6D1EA", "Spindle"], ["B6D3BF", "Gum Leaf"], ["B7410E", "Rust"], ["B78E5C", "Muddy Waters"], ["B7A214", "Sahara"], ["B7A458", "Husk"], ["B7B1B1", "Nobel"], ["B7C3D0", "Heather"], ["B7F0BE", "Madang"], ["B81104", "Milano Red"], ["B87333", "Copper"], ["B8B56A", "Gimblet"], ["B8C1B1", "Green Spring"], ["B8C25D", "Celery"], ["B8E0F9", "Sail"], ["B94E48", "Chestnut"], ["B95140", "Crail"], ["B98D28", "Marigold"], ["B9C46A", "Wild Willow"], ["B9C8AC", "Rainee"], ["BA0101", "Guardsman Red"], ["BA450C", "Rock Spray"], ["BA6F1E", "Bourbon"], ["BA7F03", "Pirate Gold"], ["BAB1A2", "Nomad"], ["BAC7C9", "Submarine"], ["BAEEF9", "Charlotte"], ["BB3385", "Medium Red Violet"], ["BB8983", "Brandy Rose"], ["BBD009", "Rio Grande"], ["BBD7C1", "Surf"], ["BCC9C2", "Powder Ash"], ["BD5E2E", "Tuscany"], ["BD978E", "Quicksand"], ["BDB1A8", "Silk"], ["BDB2A1", "Malta"], ["BDB3C7", "Chatelle"], ["BDBBD7", "Lavender Gray"], ["BDBDC6", "French Gray"], ["BDC8B3", "Clay Ash"], ["BDC9CE", "Loblolly"], ["BDEDFD", "French Pass"], ["BEA6C3", "London Hue"], ["BEB5B7", "Pink Swan"], ["BEDE0D", "Fuego"], ["BF5500", "Rose of Sharon"], ["BFB8B0", "Tide"], ["BFBED8", "Blue Haze"], ["BFC1C2", "Silver Sand"], ["BFC921", "Key Lime Pie"], ["BFDBE2", "Ziggurat"], ["BFFF00", "Lime"], ["C02B18", "Thunderbird"], ["C04737", "Mojo"], ["C08081", "Old Rose"], ["C0C0C0", "Silver"], ["C0D3B9", "Pale Leaf"], ["C0D8B6", "Pixie Green"], ["C1440E", "Tia Maria"], ["C154C1", "Fuchsia Pink"], ["C1A004", "Buddha Gold"], ["C1B7A4", "Bison Hide"], ["C1BAB0", "Tea"], ["C1BECD", "Gray Suit"], ["C1D7B0", "Sprout"], ["C1F07C", "Sulu"], ["C26B03", "Indochine"], ["C2955D", "Twine"], ["C2BDB6", "Cotton Seed"], ["C2CAC4", "Pumice"], ["C2E8E5", "Jagged Ice"], ["C32148", "Maroon Flush"], ["C3B091", "Indian Khaki"], ["C3BFC1", "Pale Slate"], ["C3C3BD", "Gray Nickel"], ["C3CDE6", "Periwinkle Gray"], ["C3D1D1", "Tiara"], ["C3DDF9", "Tropical Blue"], ["C41E3A", "Cardinal"], ["C45655", "Fuzzy Wuzzy Brown"], ["C45719", "Orange Roughy"], ["C4C4BC", "Mist Gray"], ["C4D0B0", "Coriander"], ["C4F4EB", "Mint Tulip"], ["C54B8C", "Mulberry"], ["C59922", "Nugget"], ["C5994B", "Tussock"], ["C5DBCA", "Sea Mist"], ["C5E17A", "Yellow Green"], ["C62D42", "Brick Red"], ["C6726B", "Contessa"], ["C69191", "Oriental Pink"], ["C6A84B", "Roti"], ["C6C3B5", "Ash"], ["C6C8BD", "Kangaroo"], ["C6E610", "Las Palmas"], ["C7031E", "Monza"], ["C71585", "Red Violet"], ["C7BCA2", "Coral Reef"], ["C7C1FF", "Melrose"], ["C7C4BF", "Cloud"], ["C7C9D5", "Ghost"], ["C7CD90", "Pine Glade"], ["C7DDE5", "Botticelli"], ["C88A65", "Antique Brass"], ["C8A2C8", "Lilac"], ["C8A528", "Hokey Pokey"], ["C8AABF", "Lily"], ["C8B568", "Laser"], ["C8E3D7", "Edgewater"], ["C96323", "Piper"], ["C99415", "Pizza"], ["C9A0DC", "Light Wisteria"], ["C9B29B", "Rodeo Dust"], ["C9B35B", "Sundance"], ["C9B93B", "Earls Green"], ["C9C0BB", "Silver Rust"], ["C9D9D2", "Conch"], ["C9FFA2", "Reef"], ["C9FFE5", "Aero Blue"], ["CA3435", "Flush Mahogany"], ["CABB48", "Turmeric"], ["CADCD4", "Paris White"], ["CAE00D", "Bitter Lemon"], ["CAE6DA", "Skeptic"], ["CB8FA9", "Viola"], ["CBCAB6", "Foggy Gray"], ["CBD3B0", "Green Mist"], ["CBDBD6", "Nebula"], ["CC3333", "Persian Red"], ["CC5500", "Burnt Orange"], ["CC7722", "Ochre"], ["CC8899", "Puce"], ["CCCAA8", "Thistle Green"], ["CCCCFF", "Periwinkle"], ["CCFF00", "Electric Lime"], ["CD5700", "Tenn"], ["CD5C5C", "Chestnut Rose"], ["CD8429", "Brandy Punch"], ["CDF4FF", "Onahau"], ["CEB98F", "Sorrell Brown"], ["CEBABA", "Cold Turkey"], ["CEC291", "Yuma"], ["CEC7A7", "Chino"], ["CFA39D", "Eunry"], ["CFB53B", "Old Gold"], ["CFDCCF", "Tasman"], ["CFE5D2", "Surf Crest"], ["CFF9F3", "Humming Bird"], ["CFFAF4", "Scandal"], ["D05F04", "Red Stage"], ["D06DA1", "Hopbush"], ["D07D12", "Meteor"], ["D0BEF8", "Perfume"], ["D0C0E5", "Prelude"], ["D0F0C0", "Tea Green"], ["D18F1B", "Geebung"], ["D1BEA8", "Vanilla"], ["D1C6B4", "Soft Amber"], ["D1D2CA", "Celeste"], ["D1D2DD", "Mischka"], ["D1E231", "Pear"], ["D2691E", "Hot Cinnamon"], ["D27D46", "Raw Sienna"], ["D29EAA", "Careys Pink"], ["D2B48C", "Tan"], ["D2DA97", "Deco"], ["D2F6DE", "Blue Romance"], ["D2F8B0", "Gossip"], ["D3CBBA", "Sisal"], ["D3CDC5", "Swirl"], ["D47494", "Charm"], ["D4B6AF", "Clam Shell"], ["D4BF8D", "Straw"], ["D4C4A8", "Akaroa"], ["D4CD16", "Bird Flower"], ["D4D7D9", "Iron"], ["D4DFE2", "Geyser"], ["D4E2FC", "Hawkes Blue"], ["D54600", "Grenadier"], ["D591A4", "Can Can"], ["D59A6F", "Whiskey"], ["D5D195", "Winter Hazel"], ["D5F6E3", "Granny Apple"], ["D69188", "My Pink"], ["D6C562", "Tacha"], ["D6CEF6", "Moon Raker"], ["D6D6D1", "Quill Gray"], ["D6FFDB", "Snowy Mint"], ["D7837F", "New York Pink"], ["D7C498", "Pavlova"], ["D7D0FF", "Fog"], ["D84437", "Valencia"], ["D87C63", "Japonica"], ["D8BFD8", "Thistle"], ["D8C2D5", "Maverick"], ["D8FCFA", "Foam"], ["D94972", "Cabaret"], ["D99376", "Burning Sand"], ["D9B99B", "Cameo"], ["D9D6CF", "Timberwolf"], ["D9DCC1", "Tana"], ["D9E4F5", "Link Water"], ["D9F7FF", "Mabel"], ["DA3287", "Cerise"], ["DA5B38", "Flame Pea"], ["DA6304", "Bamboo"], ["DA6A41", "Red Damask"], ["DA70D6", "Orchid"], ["DA8A67", "Copperfield"], ["DAA520", "Golden Grass"], ["DAECD6", "Zanah"], ["DAF4F0", "Iceberg"], ["DAFAFF", "Oyster Bay"], ["DB5079", "Cranberry"], ["DB9690", "Petite Orchid"], ["DB995E", "Di Serria"], ["DBDBDB", "Alto"], ["DBFFF8", "Frosted Mint"], ["DC143C", "Crimson"], ["DC4333", "Punch"], ["DCB20C", "Galliano"], ["DCB4BC", "Blossom"], ["DCD747", "Wattle"], ["DCD9D2", "Westar"], ["DCDDCC", "Moon Mist"], ["DCEDB4", "Caper"], ["DCF0EA", "Swans Down"], ["DDD6D5", "Swiss Coffee"], ["DDF9F1", "White Ice"], ["DE3163", "Cerise Red"], ["DE6360", "Roman"], ["DEA681", "Tumbleweed"], ["DEBA13", "Gold Tips"], ["DEC196", "Brandy"], ["DECBC6", "Wafer"], ["DED4A4", "Sapling"], ["DED717", "Barberry"], ["DEE5C0", "Beryl Green"], ["DEF5FF", "Pattens Blue"], ["DF73FF", "Heliotrope"], ["DFBE6F", "Apache"], ["DFCD6F", "Chenin"], ["DFCFDB", "Lola"], ["DFECDA", "Willow Brook"], ["DFFF00", "Chartreuse Yellow"], ["E0B0FF", "Mauve"], ["E0B646", "Anzac"], ["E0B974", "Harvest Gold"], ["E0C095", "Calico"], ["E0FFFF", "Baby Blue"], ["E16865", "Sunglo"], ["E1BC64", "Equator"], ["E1C0C8", "Pink Flare"], ["E1E6D6", "Periglacial Blue"], ["E1EAD4", "Kidnapper"], ["E1F6E8", "Tara"], ["E25465", "Mandy"], ["E2725B", "Terracotta"], ["E28913", "Golden Bell"], ["E292C0", "Shocking"], ["E29418", "Dixie"], ["E29CD2", "Light Orchid"], ["E2D8ED", "Snuff"], ["E2EBED", "Mystic"], ["E2F3EC", "Apple Green"], ["E30B5C", "Razzmatazz"], ["E32636", "Alizarin Crimson"], ["E34234", "Cinnabar"], ["E3BEBE", "Cavern Pink"], ["E3F5E1", "Peppermint"], ["E3F988", "Mindaro"], ["E47698", "Deep Blush"], ["E49B0F", "Gamboge"], ["E4C2D5", "Melanie"], ["E4CFDE", "Twilight"], ["E4D1C0", "Bone"], ["E4D422", "Sunflower"], ["E4D5B7", "Grain Brown"], ["E4D69B", "Zombie"], ["E4F6E7", "Frostee"], ["E4FFD1", "Snow Flurry"], ["E52B50", "Amaranth"], ["E5841B", "Zest"], ["E5CCC9", "Dust Storm"], ["E5D7BD", "Stark White"], ["E5D8AF", "Hampton"], ["E5E0E1", "Bon Jour"], ["E5E5E5", "Mercury"], ["E5F9F6", "Polar"], ["E64E03", "Trinidad"], ["E6BE8A", "Gold Sand"], ["E6BEA5", "Cashmere"], ["E6D7B9", "Double Spanish White"], ["E6E4D4", "Satin Linen"], ["E6F2EA", "Harp"], ["E6F8F3", "Off Green"], ["E6FFE9", "Hint of Green"], ["E6FFFF", "Tranquil"], ["E77200", "Mango Tango"], ["E7730A", "Christine"], ["E79F8C", "Tonys Pink"], ["E79FC4", "Kobi"], ["E7BCB4", "Rose Fog"], ["E7BF05", "Corn"], ["E7CD8C", "Putty"], ["E7ECE6", "Gray Nurse"], ["E7F8FF", "Lily White"], ["E7FEFF", "Bubbles"], ["E89928", "Fire Bush"], ["E8B9B3", "Shilo"], ["E8E0D5", "Pearl Bush"], ["E8EBE0", "Green White"], ["E8F1D4", "Chrome White"], ["E8F2EB", "Gin"], ["E8F5F2", "Aqua Squeeze"], ["E96E00", "Clementine"], ["E97451", "Burnt Sienna"], ["E97C07", "Tahiti Gold"], ["E9CECD", "Oyster Pink"], ["E9D75A", "Confetti"], ["E9E3E3", "Ebb"], ["E9F8ED", "Ottoman"], ["E9FFFD", "Clear Day"], ["EA88A8", "Carissma"], ["EAAE69", "Porsche"], ["EAB33B", "Tulip Tree"], ["EAC674", "Rob Roy"], ["EADAB8", "Raffia"], ["EAE8D4", "White Rock"], ["EAF6EE", "Panache"], ["EAF6FF", "Solitude"], ["EAF9F5", "Aqua Spring"], ["EAFFFE", "Dew"], ["EB9373", "Apricot"], ["EBC2AF", "Zinnwaldite"], ["ECA927", "Fuel Yellow"], ["ECC54E", "Ronchi"], ["ECC7EE", "French Lilac"], ["ECCDB9", "Just Right"], ["ECE090", "Wild Rice"], ["ECEBBD", "Fall Green"], ["ECEBCE", "Aths Special"], ["ECF245", "Starship"], ["ED0A3F", "Red Ribbon"], ["ED7A1C", "Tango"], ["ED9121", "Carrot Orange"], ["ED989E", "Sea Pink"], ["EDB381", "Tacao"], ["EDC9AF", "Desert Sand"], ["EDCDAB", "Pancho"], ["EDDCB1", "Chamois"], ["EDEA99", "Primrose"], ["EDF5DD", "Frost"], ["EDF5F5", "Aqua Haze"], ["EDF6FF", "Zumthor"], ["EDF9F1", "Narvik"], ["EDFC84", "Honeysuckle"], ["EE82EE", "Lavender Magenta"], ["EEC1BE", "Beauty Bush"], ["EED794", "Chalky"], ["EED9C4", "Almond"], ["EEDC82", "Flax"], ["EEDEDA", "Bizarre"], ["EEE3AD", "Double Colonial White"], ["EEEEE8", "Cararra"], ["EEEF78", "Manz"], ["EEF0C8", "Tahuna Sands"], ["EEF0F3", "Athens Gray"], ["EEF3C3", "Tusk"], ["EEF4DE", "Loafer"], ["EEF6F7", "Catskill White"], ["EEFDFF", "Twilight Blue"], ["EEFF9A", "Jonquil"], ["EEFFE2", "Rice Flower"], ["EF863F", "Jaffa"], ["EFEFEF", "Gallery"], ["EFF2F3", "Porcelain"], ["F091A9", "Mauvelous"], ["F0D52D", "Golden Dream"], ["F0DB7D", "Golden Sand"], ["F0DC82", "Buff"], ["F0E2EC", "Prim"], ["F0E68C", "Khaki"], ["F0EEFD", "Selago"], ["F0EEFF", "Titan White"], ["F0F8FF", "Alice Blue"], ["F0FCEA", "Feta"], ["F18200", "Gold Drop"], ["F19BAB", "Wewak"], ["F1E788", "Sahara Sand"], ["F1E9D2", "Parchment"], ["F1E9FF", "Blue Chalk"], ["F1EEC1", "Mint Julep"], ["F1F1F1", "Seashell"], ["F1F7F2", "Saltpan"], ["F1FFAD", "Tidal"], ["F1FFC8", "Chiffon"], ["F2552A", "Flamingo"], ["F28500", "Tangerine"], ["F2C3B2", "Mandys Pink"], ["F2F2F2", "Concrete"], ["F2FAFA", "Black Squeeze"], ["F34723", "Pomegranate"], ["F3AD16", "Buttercup"], ["F3D69D", "New Orleans"], ["F3D9DF", "Vanilla Ice"], ["F3E7BB", "Sidecar"], ["F3E9E5", "Dawn Pink"], ["F3EDCF", "Wheatfield"], ["F3FB62", "Canary"], ["F3FBD4", "Orinoco"], ["F3FFD8", "Carla"], ["F400A1", "Hollywood Cerise"], ["F4A460", "Sandy brown"], ["F4C430", "Saffron"], ["F4D81C", "Ripe Lemon"], ["F4EBD3", "Janna"], ["F4F2EE", "Pampas"], ["F4F4F4", "Wild Sand"], ["F4F8FF", "Zircon"], ["F57584", "Froly"], ["F5C85C", "Cream Can"], ["F5C999", "Manhattan"], ["F5D5A0", "Maize"], ["F5DEB3", "Wheat"], ["F5E7A2", "Sandwisp"], ["F5E7E2", "Pot Pourri"], ["F5E9D3", "Albescent White"], ["F5EDEF", "Soft Peach"], ["F5F3E5", "Ecru White"], ["F5F5DC", "Beige"], ["F5FB3D", "Golden Fizz"], ["F5FFBE", "Australian Mint"], ["F64A8A", "French Rose"], ["F653A6", "Brilliant Rose"], ["F6A4C9", "Illusion"], ["F6F0E6", "Merino"], ["F6F7F7", "Black Haze"], ["F6FFDC", "Spring Sun"], ["F7468A", "Violet Red"], ["F77703", "Chilean Fire"], ["F77FBE", "Persian Pink"], ["F7B668", "Rajah"], ["F7C8DA", "Azalea"], ["F7DBE6", "We Peep"], ["F7F2E1", "Quarter Spanish White"], ["F7F5FA", "Whisper"], ["F7FAF7", "Snow Drift"], ["F8B853", "Casablanca"], ["F8C3DF", "Chantilly"], ["F8D9E9", "Cherub"], ["F8DB9D", "Marzipan"], ["F8DD5C", "Energy Yellow"], ["F8E4BF", "Givry"], ["F8F0E8", "White Linen"], ["F8F4FF", "Magnolia"], ["F8F6F1", "Spring Wood"], ["F8F7DC", "Coconut Cream"], ["F8F7FC", "White Lilac"], ["F8F8F7", "Desert Storm"], ["F8F99C", "Texas"], ["F8FACD", "Corn Field"], ["F8FDD3", "Mimosa"], ["F95A61", "Carnation"], ["F9BF58", "Saffron Mango"], ["F9E0ED", "Carousel Pink"], ["F9E4BC", "Dairy Cream"], ["F9E663", "Portica"], ["F9EAF3", "Amour"], ["F9F8E4", "Rum Swizzle"], ["F9FF8B", "Dolly"], ["F9FFF6", "Sugar Cane"], ["FA7814", "Ecstasy"], ["FA9D5A", "Tan Hide"], ["FAD3A2", "Corvette"], ["FADFAD", "Peach Yellow"], ["FAE600", "Turbo"], ["FAEAB9", "Astra"], ["FAECCC", "Champagne"], ["FAF0E6", "Linen"], ["FAF3F0", "Fantasy"], ["FAF7D6", "Citrine White"], ["FAFAFA", "Alabaster"], ["FAFDE4", "Hint of Yellow"], ["FAFFA4", "Milan"], ["FB607F", "Brink Pink"], ["FB8989", "Geraldine"], ["FBA0E3", "Lavender Rose"], ["FBA129", "Sea Buckthorn"], ["FBAC13", "Sun"], ["FBAED2", "Lavender Pink"], ["FBB2A3", "Rose Bud"], ["FBBEDA", "Cupid"], ["FBCCE7", "Classic Rose"], ["FBCEB1", "Apricot Peach"], ["FBE7B2", "Banana Mania"], ["FBE870", "Marigold Yellow"], ["FBE96C", "Festival"], ["FBEA8C", "Sweet Corn"], ["FBEC5D", "Candy Corn"], ["FBF9F9", "Hint of Red"], ["FBFFBA", "Shalimar"], ["FC0FC0", "Shocking Pink"], ["FC80A5", "Tickle Me Pink"], ["FC9C1D", "Tree Poppy"], ["FCC01E", "Lightning Yellow"], ["FCD667", "Goldenrod"], ["FCD917", "Candlelight"], ["FCDA98", "Cherokee"], ["FCF4D0", "Double Pearl Lusta"], ["FCF4DC", "Pearl Lusta"], ["FCF8F7", "Vista White"], ["FCFBF3", "Bianca"], ["FCFEDA", "Moon Glow"], ["FCFFE7", "China Ivory"], ["FCFFF9", "Ceramic"], ["FD0E35", "Torch Red"], ["FD5B78", "Wild Watermelon"], ["FD7B33", "Crusta"], ["FD7C07", "Sorbus"], ["FD9FA2", "Sweet Pink"], ["FDD5B1", "Light Apricot"], ["FDD7E4", "Pig Pink"], ["FDE1DC", "Cinderella"], ["FDE295", "Golden Glow"], ["FDE910", "Lemon"], ["FDF5E6", "Old Lace"], ["FDF6D3", "Half Colonial White"], ["FDF7AD", "Drover"], ["FDFEB8", "Pale Prim"], ["FDFFD5", "Cumulus"], ["FE28A2", "Persian Rose"], ["FE4C40", "Sunset Orange"], ["FE6F5E", "Bittersweet"], ["FE9D04", "California"], ["FEA904", "Yellow Sea"], ["FEBAAD", "Melon"], ["FED33C", "Bright Sun"], ["FED85D", "Dandelion"], ["FEDB8D", "Salomie"], ["FEE5AC", "Cape Honey"], ["FEEBF3", "Remy"], ["FEEFCE", "Oasis"], ["FEF0EC", "Bridesmaid"], ["FEF2C7", "Beeswax"], ["FEF3D8", "Bleach White"], ["FEF4CC", "Pipi"], ["FEF4DB", "Half Spanish White"], ["FEF4F8", "Wisp Pink"], ["FEF5F1", "Provincial Pink"], ["FEF7DE", "Half Dutch White"], ["FEF8E2", "Solitaire"], ["FEF8FF", "White Pointer"], ["FEF9E3", "Off Yellow"], ["FEFCED", "Orange White"], ["FF0000", "Red"], ["FF007F", "Rose"], ["FF00CC", "Purple Pizzazz"], ["FF00FF", "Magenta / Fuchsia"], ["FF2400", "Scarlet"], ["FF3399", "Wild Strawberry"], ["FF33CC", "Razzle Dazzle Rose"], ["FF355E", "Radical Red"], ["FF3F34", "Red Orange"], ["FF4040", "Coral Red"], ["FF4D00", "Vermilion"], ["FF4F00", "International Orange"], ["FF6037", "Outrageous Orange"], ["FF6600", "Blaze Orange"], ["FF66FF", "Pink Flamingo"], ["FF681F", "Orange"], ["FF69B4", "Hot Pink"], ["FF6B53", "Persimmon"], ["FF6FFF", "Blush Pink"], ["FF7034", "Burning Orange"], ["FF7518", "Pumpkin"], ["FF7D07", "Flamenco"], ["FF7F00", "Flush Orange"], ["FF7F50", "Coral"], ["FF8C69", "Salmon"], ["FF9000", "Pizazz"], ["FF910F", "West Side"], ["FF91A4", "Pink Salmon"], ["FF9933", "Neon Carrot"], ["FF9966", "Atomic Tangerine"], ["FF9980", "Vivid Tangerine"], ["FF9E2C", "Sunshade"], ["FFA000", "Orange Peel"], ["FFA194", "Mona Lisa"], ["FFA500", "Web Orange"], ["FFA6C9", "Carnation Pink"], ["FFAB81", "Hit Pink"], ["FFAE42", "Yellow Orange"], ["FFB0AC", "Cornflower Lilac"], ["FFB1B3", "Sundown"], ["FFB31F", "My Sin"], ["FFB555", "Texas Rose"], ["FFB7D5", "Cotton Candy"], ["FFB97B", "Macaroni and Cheese"], ["FFBA00", "Selective Yellow"], ["FFBD5F", "Koromiko"], ["FFBF00", "Amber"], ["FFC0A8", "Wax Flower"], ["FFC0CB", "Pink"], ["FFC3C0", "Your Pink"], ["FFC901", "Supernova"], ["FFCBA4", "Flesh"], ["FFCC33", "Sunglow"], ["FFCC5C", "Golden Tainoi"], ["FFCC99", "Peach Orange"], ["FFCD8C", "Chardonnay"], ["FFD1DC", "Pastel Pink"], ["FFD2B7", "Romantic"], ["FFD38C", "Grandis"], ["FFD700", "Gold"], ["FFD800", "School bus Yellow"], ["FFD8D9", "Cosmos"], ["FFDB58", "Mustard"], ["FFDCD6", "Peach Schnapps"], ["FFDDAF", "Caramel"], ["FFDDCD", "Tuft Bush"], ["FFDDCF", "Watusi"], ["FFDDF4", "Pink Lace"], ["FFDEAD", "Navajo White"], ["FFDEB3", "Frangipani"], ["FFE1DF", "Pippin"], ["FFE1F2", "Pale Rose"], ["FFE2C5", "Negroni"], ["FFE5A0", "Cream Brulee"], ["FFE5B4", "Peach"], ["FFE6C7", "Tequila"], ["FFE772", "Kournikova"], ["FFEAC8", "Sandy Beach"], ["FFEAD4", "Karry"], ["FFEC13", "Broom"], ["FFEDBC", "Colonial White"], ["FFEED8", "Derby"], ["FFEFA1", "Vis Vis"], ["FFEFC1", "Egg White"], ["FFEFD5", "Papaya Whip"], ["FFEFEC", "Fair Pink"], ["FFF0DB", "Peach Cream"], ["FFF0F5", "Lavender blush"], ["FFF14F", "Gorse"], ["FFF1B5", "Buttermilk"], ["FFF1D8", "Pink Lady"], ["FFF1EE", "Forget Me Not"], ["FFF1F9", "Tutu"], ["FFF39D", "Picasso"], ["FFF3F1", "Chardon"], ["FFF46E", "Paris Daisy"], ["FFF4CE", "Barley White"], ["FFF4DD", "Egg Sour"], ["FFF4E0", "Sazerac"], ["FFF4E8", "Serenade"], ["FFF4F3", "Chablis"], ["FFF5EE", "Seashell Peach"], ["FFF5F3", "Sauvignon"], ["FFF6D4", "Milk Punch"], ["FFF6DF", "Varden"], ["FFF6F5", "Rose White"], ["FFF8D1", "Baja White"], ["FFF9E2", "Gin Fizz"], ["FFF9E6", "Early Dawn"], ["FFFACD", "Lemon Chiffon"], ["FFFAF4", "Bridal Heath"], ["FFFBDC", "Scotch Mist"], ["FFFBF9", "Soapstone"], ["FFFC99", "Witch Haze"], ["FFFCEA", "Buttery White"], ["FFFCEE", "Island Spice"], ["FFFDD0", "Cream"], ["FFFDE6", "Chilean Heath"], ["FFFDE8", "Travertine"], ["FFFDF3", "Orchid White"], ["FFFDF4", "Quarter Pearl Lusta"], ["FFFEE1", "Half and Half"], ["FFFEEC", "Apricot White"], ["FFFEF0", "Rice Cake"], ["FFFEF6", "Black White"], ["FFFEFD", "Romance"], ["FFFF00", "Yellow"], ["FFFF66", "Laser Lemon"], ["FFFF99", "Pale Canary"], ["FFFFB4", "Portafino"], ["FFFFF0", "Ivory"], ["FFFFFF", "White"]] }; ntc.init();