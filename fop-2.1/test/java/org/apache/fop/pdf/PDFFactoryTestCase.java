/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* $Id: PDFFactoryTestCase.java 1567039 2014-02-11 10:41:50Z vhennebert $ */

package org.apache.fop.pdf;

import java.io.File;
import java.net.URI;

import org.junit.Test;

import static org.junit.Assert.assertEquals;

import org.apache.xmlgraphics.io.ResourceResolver;

import org.apache.fop.apps.io.InternalResourceResolver;
import org.apache.fop.apps.io.ResourceResolverFactory;
import org.apache.fop.fonts.CIDSet;
import org.apache.fop.fonts.CIDSubset;
import org.apache.fop.fonts.EmbeddingMode;
import org.apache.fop.fonts.MultiByteFont;

/**
 * Test case for {@link PDFFactory}.
 */
public class PDFFactoryTestCase {

    /**
     * This tests that when a font is subset embedded in a PDF, the font name is prefixed with a
     * pseudo-random tag as per the PDF spec.
     */
    @Test
    public void testSubsetFontNamePrefix() {
        class MockedFont extends MultiByteFont {
            public MockedFont(InternalResourceResolver resolver) {
                super(resolver, EmbeddingMode.AUTO);
            }

            @Override
            public int[] getWidths() {
                return new int[] {0};
            }

            @Override
            public CIDSet getCIDSet() {
                return new CIDSubset(this);
            }
        }
        PDFDocument doc = new PDFDocument("Test");
        PDFFactory pdfFactory = new PDFFactory(doc);
        URI thisURI = new File(".").toURI();
        ResourceResolver resolver = ResourceResolverFactory.createDefaultResourceResolver();
        InternalResourceResolver resourceResolver = ResourceResolverFactory.createInternalResourceResolver(
                thisURI, resolver);
        MockedFont font = new MockedFont(resourceResolver);

        PDFFont pdfDejaVu = pdfFactory.makeFont("DejaVu", "DejaVu", "TTF", font, font);
        assertEquals("/EAAAAA+DejaVu", pdfDejaVu.getBaseFont().toString());

        PDFFont pdfArial = pdfFactory.makeFont("Arial", "Arial", "TTF", font, font);
        assertEquals("/EAAAAB+Arial", pdfArial.getBaseFont().toString());
    }
}
