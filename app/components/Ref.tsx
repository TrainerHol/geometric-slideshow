function AIChatHistory() {
  // ... existing code ...

  return (
    <group>
      {/* Replace position = {position} with position={position} */}
      <mesh position={position} rotation={rotation}>
        {/* Remove the non-existent <wireframe> element */}
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
}