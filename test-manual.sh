#!/usr/bin/env bash

# Manual Test Script for Resource Manager + shadcn/ui Integration
# This script performs basic validation of the registry and CLI setup

echo "🧪 Running Resource Manager Manual Tests"
echo "========================================"

# Test 1: Check registry.json exists and is valid
echo ""
echo "📋 Test 1: Registry file validation"
if [ -f "packages/registry/registry.json" ]; then
    echo "✅ Registry file exists"
    # Check if it's valid JSON
    if jq empty packages/registry/registry.json 2>/dev/null; then
        echo "✅ Registry is valid JSON"
    else
        echo "❌ Registry is invalid JSON"
        exit 1
    fi
else
    echo "❌ Registry file not found"
    exit 1
fi

# Test 2: Check for registryDependencies in components
echo ""
echo "📋 Test 2: Registry dependencies validation"
if jq -e '.components["resource-manager"].registryDependencies' packages/registry/registry.json > /dev/null; then
    echo "✅ resource-manager has registryDependencies"
    DEPS=$(jq -r '.components["resource-manager"].registryDependencies[]' packages/registry/registry.json)
    echo "   Dependencies: $DEPS"
else
    echo "❌ resource-manager missing registryDependencies"
    exit 1
fi

if jq -e '.components["resource-form-generator"].registryDependencies' packages/registry/registry.json > /dev/null; then
    echo "✅ resource-form-generator has registryDependencies"
    DEPS=$(jq -r '.components["resource-form-generator"].registryDependencies[]' packages/registry/registry.json)
    echo "   Dependencies: $DEPS"
else
    echo "❌ resource-form-generator missing registryDependencies"
    exit 1
fi

# Test 3: Check component files exist
echo ""
echo "📋 Test 3: Component files exist"
COMPONENT_FILES=$(jq -r '.components[].files[]' packages/registry/registry.json)
MISSING_FILES=0

for file in $COMPONENT_FILES; do
    if [ -f "packages/registry/$file" ]; then
        echo "✅ $file exists"
    else
        echo "❌ $file missing"
        MISSING_FILES=$((MISSING_FILES + 1))
    fi
done

if [ $MISSING_FILES -gt 0 ]; then
    echo "❌ $MISSING_FILES component files are missing"
    exit 1
fi

# Test 4: Check for correct import patterns
echo ""
echo "📋 Test 4: Import patterns validation"
if grep -q "@/components/ui/button" packages/registry/resource-manager/resource-manager.tsx; then
    echo "✅ resource-manager.tsx uses correct button import"
else
    echo "❌ resource-manager.tsx should use @/components/ui/button import"
    exit 1
fi

if grep -q "@/lib/utils" packages/registry/resource-manager/resource-manager.tsx; then
    echo "✅ resource-manager.tsx uses correct utils import"
else
    echo "❌ resource-manager.tsx should use @/lib/utils import"
    exit 1
fi

# Test 5: Check CLI TypeScript interfaces
echo ""
echo "📋 Test 5: CLI TypeScript interfaces"
if grep -q "registryDependencies?:" packages/cli/src/utils/registry.ts; then
    echo "✅ ComponentMetadata interface includes registryDependencies"
else
    echo "❌ ComponentMetadata interface missing registryDependencies"
    exit 1
fi

# Test 6: Try building CLI
echo ""
echo "📋 Test 6: CLI build test"
cd packages/cli
if npm run build > /dev/null 2>&1; then
    echo "✅ CLI builds successfully"
else
    echo "❌ CLI build failed"
    exit 1
fi
cd ../..

# Test 7: Verify ui/ folder removed (no longer needed)
echo ""
echo "📋 Test 7: Obsolete ui/ folder cleanup"
if [ ! -d "packages/registry/ui" ]; then
    echo "✅ ui/ folder correctly removed (using registryDependencies instead)"
else
    echo "⚠️  ui/ folder still exists (should be removed since using registryDependencies)"
fi

# Summary
echo ""
echo "🎉 All manual tests passed!"
echo ""
echo "📋 Next Steps:"
echo "1. Install dependencies: pnpm install"
echo "2. Run integration tests: pnpm test:integration"
echo "3. Test in a real project:"
echo "   - Create Next.js project: npx create-next-app@latest test-project"
echo "   - Setup shadcn/ui: npx shadcn@latest init"
echo "   - Test CLI: npx @resource-manager/cli add resource-manager"
echo ""
echo "✅ Registry Dependencies Migration Complete!"
