
export const BASE_LLM_URL = [
    {
        label: '阿里云百炼',
        value: 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions',
    },
    {
        label: 'deepseek',
        value: 'https://api.deepseek.com/chat/completions',
    }
]

export const MODEL_NAME_LIST = [{
    label: 'qwen-max-latest(最新模型qwen3)',
    value: 'qwen-max-latest',
    group: '百炼通义系列'
},{
    label: 'qwen3-235b-a22b',
    value: 'qwen3-235b-a22b',
    group: '百炼通义系列'
},{
    label: 'qwen3-30b-a3b',
    value: 'qwen3-30b-a3b',
    group: '百炼通义系列'
},
{
    label: 'qwen-turbo',
    value: 'qwen-turbo',
    group: '百炼通义系列'
}, {
    label: 'qwen-plus',
    value: 'qwen-plus',
    group: '百炼通义系列'
}, {
    label: 'qwen-max',
    value: 'qwen-max',
    group: '百炼通义系列'
}, {
    label: 'qwen-plus-1201',
    value: 'qwen-plus-1201',
    group: '百炼通义系列'
}, {
    label: 'qwen-max-longcontext',
    value: 'qwen-max-longcontext',
    group: '百炼通义系列'
}, {
    label: 'deepseek-r1',
    value: 'deepseek-r1',
    group: '百炼deepseek系列'
}, {
    label: 'deepseek-v3',
    value: 'deepseek-v3',
    group: '百炼deepseek系列'
}, {
    label: 'deepseek-r1-distill-qwen-1.5b',
    value: 'deepseek-r1-distill-qwen-1.5b',
    group: '百炼deepseek系列'
}, {
    label: 'deepseek-r1-distill-qwen-7b',
    value: 'deepseek-r1-distill-qwen-7b',
    group: '百炼deepseek系列'
}, {
    label: 'deepseek-r1-distill-llama-8b',
    value: 'deepseek-r1-distill-llama-8b',
    group: '百炼deepseek系列'
}, {
    label: 'deepseek-r1-distill-qwen-14b',
    value: 'deepseek-r1-distill-qwen-14b',
    group: '百炼deepseek系列'
}, {
    label: 'deepseek-r1-distill-qwen-32b',
    value: 'deepseek-r1-distill-qwen-32b',
    group: '百炼deepseek系列'
}, {
    label: 'deepseek-r1-distill-llama-70b',
    value: 'deepseek-r1-distill-llama-70b',
    group: '百炼deepseek系列'
}, {
    label: 'deepseek-v3 基础模型',
    value: 'deepseek-chat',
    group: 'deepseek系列'
}, {
    label: 'deepseek-r1 推理模型',
    value: 'deepseek-reasoner',
    group: 'deepseek系列'
}, 

{
    label: 'moonshot-v1-32k',
    value: 'moonshot-v1-32k',
    group: '月之暗面AI系列'
},
{
    label: 'moonshot-v1-128k',
    value: 'moonshot-v1-128k',
    group: '月之暗面AI系列'
}, {
    label: 'moonshot-v1-32k',
    value: 'moonshot-v1-32k',
    group: '月之暗面AI系列'
}, {
    label: 'moonshot-v1-8k',
    value: 'moonshot-v1-8k',
    group: '月之暗面AI系列'
}, {
    label: 'Baichuan2-53B',
    value: 'Baichuan2-53B',
    group: '百川AI系列'
}, {
    label: 'Baichuan2-Turbo-192k',
    value: 'Baichuan2-Turbo-192k',
    group: '百川AI系列'
}, {
    label: 'Baichuan2-Turbo',
    value: 'Baichuan2-Turbo',
    group: '百川AI系列'
}, {
    label: 'yi-34b-chat-200k',
    value: 'yi-34b-chat-200k',
    group: '零一万物AI系列'
}, {
    label: 'yi-34b-chat-0205',
    value: 'yi-34b-chat-0205',
    group: '零一万物AI系列'
}, {
    label: 'ZHIPUAI-glm-4-128k',
    value: 'glm-4',
    group: '智普AI系列'
}, {
    label: 'ZHIPUAI-glm-3-turbo-128K',
    value: 'glm-3-turbo',
    group: '智普AI系列'
}, {
    value: 'gpt-4-1106-preview',
    label: 'gpt-4-1106-preview',
    group: 'OPENAI系列'
}, {
    value: 'gpt-4-vision-preview',
    label: 'gpt-4-vision-preview',
    group: 'OPENAI系列'
}, {
    value: 'gpt-4',
    label: 'gpt-4',
    group: 'OPENAI系列'
}, {
    value: 'gpt-4-32k',
    label: 'gpt-4-32k',
    group: 'OPENAI系列'
}, {
    value: 'gpt-3.5-turbo-1106',
    label: 'gpt-3.5-turbo-1106',
    group: 'OPENAI系列'
}, {
    value: 'gpt-3.5-turbo',
    label: 'gpt-3.5-turbo',
    group: 'OPENAI系列'
}, {
    "label": "Stanford-Alpaca (7B)-2048",
    "value": "togethercomputer/alpaca-7b",
    "group": "TogetherAI"
},
{
    "label": "Austism-Chronos Hermes (13B)-2048",
    "value": "Austism/chronos-hermes-13b",
    "group": "TogetherAI"
},
{
    "label": "Meta-Code Llama Instruct (7B)-8192",
    "value": "codellama/CodeLlama-7b-Instruct-hf",
    "group": "TogetherAI"
},
{
    "label": "Meta-Code Llama Instruct (13B)-8192",
    "value": "codellama/CodeLlama-13b-Instruct-hf",
    "group": "TogetherAI"
},
{
    "label": "Meta-Code Llama Instruct (34B)-8192",
    "value": "codellama/CodeLlama-34b-Instruct-hf",
    "group": "TogetherAI"
},
{
    "label": "DiscoResearch-DiscoLM Mixtral 8x7b-32768",
    "value": "DiscoResearch/DiscoLM-mixtral-8x7b-v2",
    "group": "TogetherAI"
},
{
    "label": "TII UAE Falcon Instruct (40B)-2048",
    "value": "togethercomputer/falcon-40b-instruct",
    "group": "TogetherAI"
},
{
    "label": "TII UAE Falcon Instruct (7B)-2048",
    "value": "togethercomputer/falcon-7b-instruct",
    "group": "TogetherAI"
},
{
    "label": "Together-GPT-NeoXT-Chat-Base (20B)-2048",
    "value": "togethercomputer/GPT-NeoXT-Chat-Base-20B",
    "group": "TogetherAI"
},
{
    "label": "Meta-LLaMA-2 Chat (7B)-4096",
    "value": "meta-llama/Llama-2-7b-chat-hf",
    "group": "TogetherAI"
},
{
    "label": "Meta-LLaMA-2 Chat (13B)-4096",
    "value": "meta-llama/Llama-2-13b-chat-hf",
    "group": "TogetherAI"
},
{
    "label": "Meta-LLaMA-2 Chat (70B)-4096",
    "value": "meta-llama/Llama-2-70b-chat-hf",
    "group": "TogetherAI"
},
{
    "label": "Together-LLaMA-2-7B-32K-Instruct (7B)-32768",
    "value": "togethercomputer/Llama-2-7B-32K-Instruct",
    "group": "TogetherAI"
},
{
    "label": "MistralAI-Mistral (7B) Instruct v0.1-4096",
    "value": "mistralai/Mistral-7B-Instruct-v0.1",
    "group": "TogetherAI"
},
{
    "label": "MistralAI-Mistral (7B) Instruct v0.2-32768",
    "value": "mistralai/Mistral-7B-Instruct-v0.2",
    "group": "TogetherAI"
},
{
    "label": "MistralAI-Mixtral-8x7B Instruct-32768",
    "value": "mistralai/Mixtral-8x7B-Instruct-v0.1",
    "group": "TogetherAI"
},
{
    "label": "Gryphe-MythoMax-L2 (13B)-4096",
    "value": "Gryphe/MythoMax-L2-13b",
    "group": "TogetherAI"
},
{
    "label": "NousResearch-Nous Hermes LLaMA-2 (7B)-4096",
    "value": "NousResearch/Nous-Hermes-llama-2-7b",
    "group": "TogetherAI"
},
{
    "label": "NousResearch-Nous Hermes Llama-2 (13B)-4096",
    "value": "NousResearch/Nous-Hermes-Llama2-13b",
    "group": "TogetherAI"
},
{
    "label": "NousResearch-Nous Hermes Llama-2 (70B)-4096",
    "value": "NousResearch/Nous-Hermes-Llama2-70b",
    "group": "TogetherAI"
},
{
    "label": "NousResearch-Nous Hermes 2 - Mixtral 8x7B - DPO-32768",
    "value": "NousResearch/Nous-Hermes-2-Mixtral-8x7B-DPO",
    "group": "TogetherAI"
},
{
    "label": "NousResearch-Nous Hermes 2 - Mixtral 8x7B - SFT-32768",
    "value": "NousResearch/Nous-Hermes-2-Mixtral-8x7B-SFT",
    "group": "TogetherAI"
},
{
    "label": "NousResearch-Nous Hermes-2 Yi (34B)-4096",
    "value": "NousResearch/Nous-Hermes-2-Yi-34B",
    "group": "TogetherAI"
},
{
    "label": "NousResearch-Nous Capybara v1.9 (7B)-8192",
    "value": "NousResearch/Nous-Capybara-7B-V1p9",
    "group": "TogetherAI"
},
{
    "label": "OpenChat-OpenChat 3.5 1210 (7B)-8192",
    "value": "openchat/openchat-3.5-1210",
    "group": "TogetherAI"
},
{
    "label": "teknium-OpenHermes-2-Mistral (7B)-4096",
    "value": "teknium/OpenHermes-2-Mistral-7B",
    "group": "TogetherAI"
},
{
    "label": "teknium-OpenHermes-2.5-Mistral (7B)-4096",
    "value": "teknium/OpenHermes-2p5-Mistral-7B",
    "group": "TogetherAI"
},
{
    "label": "OpenOrca-OpenOrca Mistral (7B) 8K-8192",
    "value": "Open-Orca/Mistral-7B-OpenOrca",
    "group": "TogetherAI"
},
{
    "label": "garage-bAInd-Platypus2 Instruct (70B)-4096",
    "value": "garage-bAInd/Platypus2-70B-instruct",
    "group": "TogetherAI"
},
{
    "label": "Together-Pythia-Chat-Base (7B)-2048",
    "value": "togethercomputer/Pythia-Chat-Base-7B-v0.16",
    "group": "TogetherAI"
},
{
    "label": "Together-RedPajama-INCITE Chat (3B)-2048",
    "value": "togethercomputer/RedPajama-INCITE-Chat-3B-v1",
    "group": "TogetherAI"
},
{
    "label": "Together-RedPajama-INCITE Chat (7B)-2048",
    "value": "togethercomputer/RedPajama-INCITE-7B-Chat",
    "group": "TogetherAI"
},
{
    "label": "Qwen-Qwen-Chat (7B)-8192",
    "value": "togethercomputer/Qwen-7B-Chat",
    "group": "TogetherAI"
},
{
    "label": "Upstage-SOLAR v0 (70B)-4096",
    "value": "upstage/SOLAR-0-70b-16bit",
    "group": "TogetherAI"
},
{
    "label": "Together-StripedHyena Nous (7B)-32768",
    "value": "togethercomputer/StripedHyena-Nous-7B",
    "group": "TogetherAI"
},
{
    "label": "LM Sys-Vicuna v1.5 (7B)-4096",
    "value": "lmsys/vicuna-7b-v1.5",
    "group": "TogetherAI"
},
{
    "label": "LM Sys-Vicuna v1.5 (13B)-4096",
    "value": "lmsys/vicuna-13b-v1.5",
    "group": "TogetherAI"
},
{
    "label": "LM Sys-Vicuna v1.5 16K (13B)-16384",
    "value": "lmsys/vicuna-13b-v1.5-16k",
    "group": "TogetherAI"
},
{
    "label": "01.AI-01-ai Yi Chat (34B)-4096",
    "value": "zero-one-ai/Yi-34B-Chat",
    "group": "TogetherAI"
},
{
    "label": "Snorkel AI-Snorkel Mistral PairRM DPO-8192",
    "value": "snorkelai/Snorkel-Mistral-PairRM-DPO",
    "group": "TogetherAI"
}];