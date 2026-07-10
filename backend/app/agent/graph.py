"""LangGraph wiring of the assessment pipeline."""

from langgraph.graph import END, START, StateGraph

from app.agent.nodes import assess, build_profile, retrieve, verify_and_compose
from app.agent.state import AgentState


def _route_after_profile(state: AgentState) -> str:
    return "retrieve" if state["status"] == "ok" else END


def build_graph():
    graph = StateGraph(AgentState)
    graph.add_node("build_profile", build_profile)
    graph.add_node("retrieve", retrieve)
    graph.add_node("assess", assess)
    graph.add_node("verify_and_compose", verify_and_compose)

    graph.add_edge(START, "build_profile")
    graph.add_conditional_edges("build_profile", _route_after_profile)
    graph.add_edge("retrieve", "assess")
    graph.add_edge("assess", "verify_and_compose")
    graph.add_edge("verify_and_compose", END)
    return graph.compile()


_pipeline = None


def get_pipeline():
    global _pipeline
    if _pipeline is None:
        _pipeline = build_graph()
    return _pipeline


def run_assessment(message: str, prior_profile: dict | None = None) -> AgentState:
    return get_pipeline().invoke({"message": message, "prior_profile": prior_profile})
