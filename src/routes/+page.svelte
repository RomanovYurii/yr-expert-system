<script>
  import { rules, run } from './base';

  let started = false;
  let ruleCounter = 0;
  $: currentRuleKey = Object.keys(rules)[ruleCounter];
  $: currentRule = rules[currentRuleKey];
  let facts = {};
  let input = 0;

  let finished = false;

  const handleOptionClick = (text) => {
    facts[currentRuleKey] = text;

    if (typeof text === 'number' && text < 0) {
      return;
    }

    if (facts.necessity && facts.necessity === 'No') {
      finished = true;
      return;
    }

    if (Object.keys(rules)[ruleCounter + 1] === 'gaming_type' && !Object.values(facts).includes('Gaming')) {
      ruleCounter += 2;
      return;
    }

    if (Object.keys(rules)[ruleCounter + 1] === undefined) {
      finished = true;
      return;
    }

    ruleCounter++;
  };

  const restart = () => {
    started = false;
    facts = {};
    finished = false;
    ruleCounter = 0;
  };
</script>

<div class='root'>
  <h1>Welcome to YR Expert System</h1>
  <h2>This expert system will help you to choose a computer suited for you!</h2>

  {#if !started}
    <p>Press the button below to start!</p>

    <button on:click={() => started = !started}>Start!</button>
  {:else if !finished}
    <div class='question'>
      <p>
        <b>{currentRule.text}</b>
        {#if currentRule.tip}
          <br /><b><small>{currentRule.tip}</small></b>
        {/if}
      </p>
    </div>
    {#if currentRule.options}
      {#each currentRule.options as option}
        <button on:click={() => handleOptionClick(option.text)}>{option.text}</button>
      {/each}
    {/if}
    {#if currentRule.input}
      <input type='number' min='0' step='1' bind:value={input}>
      <button on:click={() => handleOptionClick(input)}>Confirm</button>
    {/if}
  {:else}
    <h2>Summary</h2>
    <div class='result'>
      {@html run(facts)}
    </div>
    <button on:click={restart}>Restart</button>
  {/if}
</div>

<style lang='scss'>
  .root {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 786px;
    margin: 0 auto;
    text-align: center;

    .result {
      width: 100%;
      text-align: left;
    }

    .question {
      display: flex;
      justify-content: center;
    }

    input, button {
      min-height: 30px;
      margin-top: 8px;
      width: 30%;

      &[type="number"] {
        width: calc(30% - 8px);
      }
    }

    button {
      padding: 6px;
    }
  }
</style>