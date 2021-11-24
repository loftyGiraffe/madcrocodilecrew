import { useWeb3React } from "@web3-react/core";
import { injected } from "../components/wallet/connectors";
import Web3 from "web3";
import NumericInput from "react-numeric-input";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Head from "next/head";

export default function Home() {
    let web3 = new Web3(Web3.givenProvider);
    const [value, setValue] = useState(1);
    const { active, account, library, connector, activate, deactivate } =
        useWeb3React();

    async function connect() {
        try {
            await activate(injected);
        } catch (ex) {
            console.log(ex);
        }
    }

    async function disconnect() {
        try {
            deactivate();
        } catch (ex) {
            console.log(ex);
        }
    }

    const sendHandler = () => {
        console.log("dasdas", value, typeof value);
        web3.eth.sendTransaction({
            from: account,
            to: "0xEb428EBaA31b8f8e67AA4dd3efE68D412857b5e3",
            value: web3.utils.toWei(value.toString(), "ether") * 0.0555,
        });
    };
    return (
        <div
            className="background"
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100vw",
                height: "100vh",
                flexDirection: "column",
                // backgroundColor: "red",
                letterSpacing: "2px",
                fontWeight: "300",
                fontFamily: "Oswald",
            }}
        >
            <Head>
                <link
                    href="https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <div>
                <div
                    style={{
                        fontSize: "90px",
                        fontWeight: "400",
                        color: "white",
                        lineHeight: "130px",
                        letterSpacing: "6px",
                    }}
                >
                </div>
                <div
                    style={{
                        textAlign: "end",
                        fontWeight: "400",
                        fontSize: "36px",
                        color: "white",
                        letterSpacing: "6px",
                    }}
                >

                </div>
            </div>
            <div
                style={{
                    height: "3px",
                    width: "35%",
                    backgroundColor: "#5cd85a",
                    marginTop: "200px",
                }}
            ></div>
            <button
                style={{
                    marginTop: "30px",
                    borderWidth: "2px",
                    color: "#5cd85a",
                    padding: "10px 14px",
                    fontSize: "20px",
                    backgroundColor: "#142e13",
                }}
                onClick={() => {
                    if (active && account) {
                    } else {
                        connect();
                    }
                }}
            >
                {active && account
                    ? `Wallet Connected: ${account}`
                    : "Click to connect with MetaMask"}
            </button>
            <div
                style={{
                    color: "#5cd85a",
                    fontSize: "30px",
                    marginTop: "40px",
                    marginBottom: "30px",
                    fontWeight: '500'
                }}
            >
                Total Minted: 642 / 1000
            </div>

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <div style={{ color: "#5cd85a", fontSize: "30px", fontWeight: '500',}}>I want to mint</div>
                <input
                    value={value}
                    onChange={(e) => {
                        setValue(e.target.value.toString());
                    }}
                    style={{
                        height: "30px",
                        marginLeft: "6px",
                        marginRight: "6px",
                        width: "45px",
                        padding: "3px 6px",
                        borderRadius: "6px",
                        fontWeight: '500',
                    }}
                    min="1"
                    max="10"
                    type="number"
                />
                <div style={{ color: "#5cd85a", fontSize: "30px", fontWeight: '500', }}>Mad Crocodile(s)</div>
            </div>
            <button
                onClick={() => {
                    if (active) {
                        sendHandler();
                    } else {
                        return;
                    }
                }}
                type="button"
                style={{
                    marginTop: "30px",
                    borderWidth: "2px",
                    color: "#5cd85a",
                    padding: "10px 14px",
                    fontSize: "20px",
                    backgroundColor: "#142e13",

                }}
            >
                {active
                    ? `Mint ${value} Mad Crocodile(s) for ${
                        (value * 0.0555).toFixed(4)
                    } ETH + Network gas fees`
                    : "Wallet is not connected"}
            </button>
            <div
                style={{
                    height: "3px",
                    width: "45%",
                    backgroundColor: "#5cd85a",
                    marginTop: "24px",
                    marginBottom: "60px",
                }}
            ></div>
        </div>
    );
}
