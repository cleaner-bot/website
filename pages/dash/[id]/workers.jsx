
import { useRef } from "react";
import Link from "next/link";


import { useData } from "@/components/dash/data.jsx";
import { Page, Header, Section } from "@/components/dash/dash.jsx";
import { PlainBlock, ToggleBlock } from "@/components/dash/block.jsx";
import MetaTags from "@/components/metatags.jsx";
import { doChange, putWorker } from "@/lib/api.js";

export default function DashboardWrapper() {
    const data = useData();
    return (
        <>
            <MetaTags
                title="Workers | The Cleaner Dashboard"
            />
            <Page page="workers" {...data}>
                <WorkersDashboard {...data} />
            </Page>
        </>
    )
}


function WorkersDashboard({ config, setConfig, entitlements, guildId }) {
    const fileInputRef = useRef();
    return (
        <>
            <Header name="Workers">
                Manage your worker.
            </Header>
            <Section>
                <ToggleBlock
                    name="Enable workers"
                    description="Enable workers."
                    field="workers_enabled"
                    config={config}
                    setConfig={setConfig}
                    guildId={guildId}
                    entitlement={entitlements.workers}
                    entitlements={entitlements}
                />
                {config.workers_enabled && <>
                    <PlainBlock
                        name="Upload worker code"
                        description={<>
                            Type your worker code.
                            It is currently not possible to retrieve your worker&apos;s source.{" "}
                            <Link href="/docs/worker#api">
                                <a className="font-bold hover:underline">
                                    API docs.
                                </a>
                            </Link>{" "}
                            <Link href="/docs/worker#examples">
                                <a className="font-bold hover:underline">
                                    Examples.
                                </a>
                            </Link>
                        </>}
                    >
                        <button
                            className="w-full mx-auto mt-6 --btn --btn-3 --btn-primary sm:w-80 lg:mx-0"
                            onClick={async () => {
                                fileInputRef.current.click();
                            }}
                        >
                            Upload
                        </button>

                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept=".lua, application/x-lua"
                            onInput={() => {
                                const file = fileInputRef.current.files[0];
                                if(!file) return;

                                const reader = new FileReader();
                                reader.addEventListener("load", event => {
                                    const source = event.target.result;
                                    doChange(putWorker(guildId, source));
                                })
                                reader.readAsText(file)
                            }}
                        />
                    </PlainBlock>
                </>}
            </Section>
        </>
    )
}

