import Footer from "@/components/footer.jsx";
import MetaTags from "@/components/metatags.jsx";
import Header from "@/components/header";

export default function Pricing() {
    return (
        <div className="--container">
            <MetaTags
                title="The Cleaner Pricing"
                description="You aren't supposed to see this yet :eyes:"
            />
            <Header />
            <div className="mx-auto mt-16 space-y-2 max-w-prose ">
                <h2 className="text-5xl font-bold">Pricing</h2>
                <p>
                    Any bot costs money to operate, The Cleaner is not an
                    exception. To pay for our operating costs, The Cleaner
                    requires a subscription for servers above a certain size.
                </p>
                <h3 className="pt-2 text-3xl font-semibold" id="pricing-table">
                    Server tiers
                </h3>
                <PricingCards />
                <p>* Price is in credits. 1 EUR ~ 1 credit.</p>
                <p>** Yearly pricing available. (2 months for free)</p>
                <h3
                    className="pt-2 text-3xl font-semibold"
                    id="payment-options"
                >
                    Available addons
                </h3>
                <p>Addons can be purchased independently of tiers.</p>
                <Addons />
                <p>* Price is in credits. 1 EUR ~ 1 credit.</p>
                <p>** Setup price is paid once.</p>
                <h3
                    className="pt-2 text-3xl font-semibold"
                    id="payment-options"
                >
                    Payment options
                </h3>
                <p>The Cleaner currently supports:</p>
                <ul className="list-disc list-inside">
                    <li>
                        Credit / Debit Cards{" "}
                        <span className="italic text-gray-300">(Stripe)</span>
                    </li>
                    <li>
                        Crypto Currencies{" "}
                        <span className="italic text-gray-300">(Coinbase)</span>
                    </li>
                </ul>
                <p>
                    Because Crypto Currencies do not support repeated payments
                    out-of-the-box, we implement a <b>prepaid system</b>. You
                    can transfer crypto currency to us at any time, and we will
                    convert it to <b>credits</b>, matching the current EURO
                    exchange.
                </p>
                <p>
                    For example, if the ETH ~ EUR exchange is at 1 ETH ~ 1,700€,
                    you get 1,700 credits per transfered ETH. Even if ETH
                    crashes to 0€ afterwards, you will retain your 1,700
                    credits.
                </p>
                <p>
                    <b>
                        You are not able to withdraw credits. No exceptions. We
                        are not a bank.
                    </b>
                </p>
                <p>
                    Credits are bound to your Discord Accounts. It&apos;s your
                    responsibility to keep it safe.
                </p>
                <h3 className="pt-2 text-3xl font-semibold" id="renewal">
                    Renewal
                </h3>
                <p>
                    In case you need to renew your subscription, the following
                    actions are executed in this order:
                </p>
                <ol className="list-decimal list-inside">
                    <li>
                        If you have enough credits, the renewal amount will be
                        deducted.
                    </li>
                    <li>
                        If you do not have enough credits, but a card is set, it
                        will be charged with the renewal amount.
                    </li>
                    <li>
                        If you do not have enough credits and do not have a
                        payment method set, we will contact you.
                    </li>
                </ol>
                <p>
                    If renewal fails, your server enters a two-week grace
                    period, during which the bot continues to operate normally.
                    Pay the subscription within that timeframe and everything is
                    ok. Failure to perform the payment within the grave period
                    will result in a suspension.
                </p>
                <p>
                    <b>
                        Cancel your subscription before renewal to avoid
                        suspension.
                    </b>
                </p>
                <h3 className="pt-2 text-3xl font-semibold" id="free-trial">
                    Cancellation
                </h3>
                <p>You can cancel at anytime in the Dashboard.</p>
                <h3 className="pt-2 text-3xl font-semibold" id="free-trial">
                    Free Trial
                </h3>
                <p>
                    From the moment your server is required to pay (aka
                    surpasses the 20k member threshold), a four-week trial is
                    automatically activated. After the trial was activated, it&apos;s
                    impossible to cancel it. You are eligible for another trial
                    a year after your current subscription ends.
                </p>
                <p>
                    You will be notified when the trial starts. You will also be
                    notified several times in the days leading up to the
                    expiration of the trial.
                </p>
            </div>
            <div className="pb-8 mt-20 border-t border-gray-550" />
            <Footer />
        </div>
    );
}

const tiers = [
    { name: "Free", price: 0, members: 20_000 },
    { name: "50k", price: 3, members: 50_000 },
    { name: "100k", price: 5, members: 100_000 },
    { name: "250k", price: 10, members: 250_000 },
    { name: "GOAT", price: 20, members: 10_000_000 },
];

function PricingCards() {
    return (
        <table className="w-full border divide-y divide-gray-550 border-gray-550">
            <thead className="bg-gray-600">
                <tr>
                    <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-300 uppercase"
                    >
                        Name
                    </th>
                    <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-300 uppercase"
                    >
                        Price * per month **
                    </th>
                    <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-300 uppercase"
                    >
                        Max members
                    </th>
                </tr>
            </thead>
            <tbody>
                {tiers.map((tier, idx) => (
                    <tr
                        key={tier.name}
                        className={idx % 2 === 1 && "bg-gray-650"}
                    >
                        <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                            {tier.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-right text-gray-300 whitespace-nowrap">
                            {tier.price}
                        </td>
                        <td className="px-6 py-4 text-sm text-right text-gray-300 whitespace-nowrap">
                            {tier.members.toLocaleString()}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

const addons = [
    {
        name: "Branding",
        price: 5,
        setup: 20,
        description: "Custom website branding + Bot",
    },
];
function Addons() {
    return (
        <table className="w-full border divide-y divide-gray-550 border-gray-550">
            <thead className="bg-gray-600">
                <tr>
                    <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-300 uppercase"
                    >
                        Name
                    </th>
                    <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-300 uppercase"
                    >
                        Price per month *
                    </th>
                    <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-300 uppercase"
                    >
                        Setup price * **
                    </th>
                    <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-300 uppercase"
                    >
                        Description
                    </th>
                </tr>
            </thead>
            <tbody>
                {addons.map((addon, idx) => (
                    <tr
                        key={addon.name}
                        className={idx % 2 === 1 && "bg-gray-650"}
                    >
                        <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                            {addon.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-right text-gray-300 whitespace-nowrap">
                            {addon.price}
                        </td>
                        <td className="px-6 py-4 text-sm text-right text-gray-300 whitespace-nowrap">
                            {addon.setup}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-300 whitespace-nowrap">
                            {addon.description}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
